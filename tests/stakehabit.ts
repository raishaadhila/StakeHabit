import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import { Stakehabit } from "../target/types/stakehabit";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import assert from "assert";

describe("stakehabit", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.Stakehabit as Program<Stakehabit>;
  const provider = anchor.getProvider() as anchor.AnchorProvider;
  const owner = provider.wallet;

  const TITLE = "Exercise daily";
  const DURATION = 7;
  const STAKE = new BN(0.1 * LAMPORTS_PER_SOL);

  const [goalPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("goal"), owner.publicKey.toBuffer(), Buffer.from(TITLE)],
    program.programId
  );
  const [escrowPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("escrow"), goalPda.toBuffer()],
    program.programId
  );
  const [progressPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("progress"), goalPda.toBuffer()],
    program.programId
  );
  const [prizePoolPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("prize_pool")],
    program.programId
  );

  it("creates a goal and stakes SOL", async () => {
    await program.methods
      .createGoal(TITLE, DURATION, STAKE)
      .accounts({
        owner: owner.publicKey,
        goal: goalPda,
        escrow: escrowPda,
        progress: progressPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const goal = await program.account.goal.fetch(goalPda);
    assert.equal(goal.title, TITLE);
    assert.equal(goal.durationDays, DURATION);
    assert.equal(goal.isActive, true);
    assert.equal(goal.isSettled, false);

    const escrow = await program.account.stakeEscrow.fetch(escrowPda);
    assert.ok(escrow.amountLamports.eq(STAKE));

    const progress = await program.account.progress.fetch(progressPda);
    assert.equal(progress.completedDays, 0);
    assert.equal(progress.totalDays, DURATION);

    console.log("✅ create_goal passed");
  });

  it("checks in successfully", async () => {
    await program.methods
      .checkIn()
      .accounts({
        owner: owner.publicKey,
        goal: goalPda,
        progress: progressPda,
      })
      .rpc();

    const progress = await program.account.progress.fetch(progressPda);
    assert.equal(progress.completedDays, 1);
    assert.equal(progress.streak, 1);

    console.log("✅ check_in passed");
  });

  it("rejects double check-in on same day", async () => {
    try {
      await program.methods
        .checkIn()
        .accounts({
          owner: owner.publicKey,
          goal: goalPda,
          progress: progressPda,
        })
        .rpc();
      assert.fail("Should have thrown");
    } catch (err: any) {
      assert.ok(err.message.includes("AlreadyCheckedIn") || err.error?.errorCode?.code === "AlreadyCheckedIn");
      console.log("✅ double check-in rejected");
    }
  });
});
