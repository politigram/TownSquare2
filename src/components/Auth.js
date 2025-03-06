import React, { useState } from "react";
import { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  signOut 
} from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth";
import styles from "../styles/Auth.module.css";

export default function Auth() {
  const [user] = useAuthState(auth);
  const [step, setStep] = useState(1); // ✅ Track signup step
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [ideology, setIdeology] = useState(""); // ✅ Track ideology test results
  const [isVerified, setIsVerified] = useState(false); // ✅ Track email verification status

  // ✅ Step 1: Create an Account (Email & Password)
  const handleCreateAccount = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      alert("Verification email sent! Please check your inbox.");
      setStep(2); // Move to Step 2 (Username)
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Step 2: Set Username
  const handleSetUsername = async () => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: username });
        setStep(3); // Move to Step 3 (Ideology Test)
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Step 3: Ideology Test (Placeholder)
  const handleCompleteIdeologyTest = () => {
    setIdeology("Centrist"); // 🚀 Placeholder for actual test
    setStep(4); // Move to Step 4 (Email Verification)
  };

  // ✅ Step 4: Check if Email is Verified
  const checkEmailVerification = async () => {
    await auth.currentUser.reload();
    if (auth.currentUser.emailVerified) {
      setIsVerified(true);
      alert("Your email is verified! You can now participate in discussions.");
    } else {
      alert("Please verify your email before continuing.");
    }
  };

  return (
    <div className={styles.authContainer}>
      {user ? (
        isVerified ? (
          <div>
            <p>Welcome, {user.displayName || "User"}!</p>
            <button onClick={() => signOut(auth)}>Sign Out</button>
          </div>
        ) : (
          <div>
            <p>Please verify your email to continue.</p>
            <button onClick={checkEmailVerification}>I have verified</button>
          </div>
        )
      ) : (
        <>
          {step === 1 && (
            <>
              <h2>Step 1: Create an Account</h2>
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              <button onClick={handleCreateAccount}>Next</button>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Step 2: Choose a Username</h2>
              <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
              <button onClick={handleSetUsername}>Next</button>
            </>
          )}

          {step === 3 && (
            <>
              <h2>Step 3: Ideology Test</h2>
              <p>[Placeholder for actual test]</p>
              <button onClick={handleCompleteIdeologyTest}>Complete Test</button>
            </>
          )}

          {step === 4 && (
            <>
              <h2>Step 4: Verify Email</h2>
              <p>Check your email for a verification link. Click below when verified.</p>
              <button onClick={checkEmailVerification}>I have verified</button>
            </>
          )}

          {error && <p className={styles.error}>{error}</p>}
        </>
      )}
    </div>
  );
}
