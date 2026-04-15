import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/electrify-logo.png";
import authBg from "../../assets/auth-bg.png";
import { useAuth } from "../context/AuthContext";
import { AuthService } from "../../application/services/AuthService";

const authService = new AuthService();

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [address, setAddress] = useState(user?.address || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage("");

    try {
      // Placeholder until backend update-profile API is ready
      setProfileMessage("Profile update API is not connected yet. UI is ready.");
    } catch (err) {
      setProfileMessage(err instanceof Error ? err.message : "Profile update failed");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage("");

    try {
      await authService.changePassword({
        currentPassword,
        newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setPasswordMessage("Password changed successfully.");
    } catch (err) {
      setPasswordMessage(err instanceof Error ? err.message : "Password change failed");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-slate-950">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${authBg})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.82)_0%,rgba(2,6,23,0.7)_35%,rgba(2,6,23,0.9)_100%)]" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <img
            src={logo}
            alt="Electrify"
            className="w-52 object-contain sm:w-64 lg:w-72"
          />

          <div className="flex items-center gap-3">
            <Link
              to="/home"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
            >
              Back to Home
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 px-5 pb-6 sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                Profile Overview
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Name</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {user?.firstName || "User"} {user?.lastName || ""}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Email</p>
                  <p className="mt-1 text-base text-slate-200">
                    {user?.email || "Not available"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Phone</p>
                  <p className="mt-1 text-base text-slate-200">
                    {user?.phoneNumber || "Not available"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Address</p>
                  <p className="mt-1 text-base text-slate-200">
                    {user?.address || "Not available"}
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                  Edit Profile
                </p>

                <form onSubmit={handleProfileUpdate} className="mt-6 space-y-4">
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="h-11 w-full rounded-2xl border border-slate-400/15 bg-slate-950/95 px-4 text-white outline-none placeholder:text-slate-400 focus:border-blue-400/70 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="h-11 w-full rounded-2xl border border-slate-400/15 bg-slate-950/95 px-4 text-white outline-none placeholder:text-slate-400 focus:border-blue-400/70 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="h-11 w-full rounded-2xl border border-slate-400/15 bg-slate-950/95 px-4 text-white outline-none placeholder:text-slate-400 focus:border-blue-400/70 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                    className="h-11 w-full rounded-2xl border border-slate-400/15 bg-slate-950/95 px-4 text-white outline-none placeholder:text-slate-400 focus:border-blue-400/70 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    className="h-11 w-full rounded-2xl border border-slate-400/15 bg-slate-950/95 px-4 text-white outline-none placeholder:text-slate-400 focus:border-blue-400/70 focus:ring-4 focus:ring-blue-500/10"
                  />

                  {profileMessage ? (
                    <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
                      {profileMessage}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="h-11 w-full rounded-2xl bg-slate-950 text-base font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {profileLoading ? "Saving..." : "Save Profile"}
                  </button>
                </form>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                  Change Password
                </p>

                <form onSubmit={handleChangePassword} className="mt-6 space-y-4">
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current Password"
                    className="h-11 w-full rounded-2xl border border-slate-400/15 bg-slate-950/95 px-4 text-white outline-none placeholder:text-slate-400 focus:border-blue-400/70 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    className="h-11 w-full rounded-2xl border border-slate-400/15 bg-slate-950/95 px-4 text-white outline-none placeholder:text-slate-400 focus:border-blue-400/70 focus:ring-4 focus:ring-blue-500/10"
                  />

                  {passwordMessage ? (
                    <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
                      {passwordMessage}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="h-11 w-full rounded-2xl bg-slate-950 text-base font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {passwordLoading ? "Updating..." : "Change Password"}
                  </button>
                </form>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}