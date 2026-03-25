import { AnchorProvider, Program, BN } from "@coral-xyz/anchor";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import idl from "./idl.json";

export const PROGRAM_ID = new PublicKey("BiNHU6WREw9goaqhSS842Ls667rwgzTodueRXVssDrkx");
export const CONNECTION = new Connection(clusterApiUrl("devnet"), "confirmed");

export function getProgram(wallet: any) {
  const provider = new AnchorProvider(CONNECTION, wallet, { commitment: "confirmed" });
  return new Program(idl as any, provider);
}

export function getGoalPda(owner: PublicKey, title: string) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("goal"), owner.toBuffer(), Buffer.from(title)],
    PROGRAM_ID
  );
}

export function getEscrowPda(goalPda: PublicKey) {
  return PublicKey.findProgramAddressSync([Buffer.from("escrow"), goalPda.toBuffer()], PROGRAM_ID);
}

export function getProgressPda(goalPda: PublicKey) {
  return PublicKey.findProgramAddressSync([Buffer.from("progress"), goalPda.toBuffer()], PROGRAM_ID);
}
