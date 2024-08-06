'use server';
import { signIn, signOut } from '@/auth';

export const handleSignout = async () => await signOut();

export const handleGoogleSignin = async () => {};
