"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Hexagon,
  ChevronDown,
  LogOut,
  CheckCircle,
  User,
  Settings,
  Mail,
  LayoutDashboard,
  Droplets,
  Smile,
  BarChart3,
  FileText,
} from "lucide-react";
import { getCompletedActivities } from "@/lib/activityProgress";
import { authClient } from "@/lib/auth-client";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isAuthenticated = !!user;
  const router = useRouter();
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [completed, setCompleted] = useState(() => getCompletedActivities());

  const dropdownRef = useRef(null);
  const dashboardRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const t = localStorage.getItem("theme");
    if (t === "dark" || !t) document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    const handler = () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    };
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActivitiesOpen(false);
      }
      if (dashboardRef.current && !dashboardRef.current.contains(e.target)) {
        setDashboardOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const activityLinks = [
    { label: "Click Accuracy", href: "/clickAccuracy" },
    { label: "Memory Card", href: "/memoryCard" },
    { label: "Pattern Memory", href: "/patternMemory" },
    { label: "Mood Questionnaire", href: "/moodQuestionnaire" },
    { label: "Stroop Test", href: "/stroopTest" },
    { label: "Reaction Test", href: "/reactionTest" },
    { label: "Visual Preference", href: "/visualPreference" },
  ];

  const dashboardLinks = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    {
      label: "Daily Logs (Water & Sleep)",
      href: "/dashboard/daily-logs",
      icon: Droplets,
    },
    { label: "Today's Mood Check-in", href: "/dashboard/mood", icon: Smile },
    {
      label: "My Psychograph Score",
      href: "/dashboard/psychograph",
      icon: BarChart3,
    },
    {
      label: "Download Report (PDF)",
      href: "/dashboard/reports",
      icon: FileText,
    },
  ];

  const navLinkClass =
    "relative text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 group";

  return (
    <nav suppressHydrationWarning className="flex items-center justify-between px-6 py-4 bg-white/60 dark:bg-black/60 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 sticky top-0 z-50 shadow-sm">
      {/* LEFT SIDE: Logo & Navigation Links */}
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-2 group">
          {mounted && <Hexagon className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:rotate-90 transition-transform duration-500" />}
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            PsychoGraph
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className={navLinkClass}>
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Dashboard Dropdown (Authenticated Users Only) */}
          {mounted && isAuthenticated && (
            <div className="relative" ref={dashboardRef}>
              <button
                onClick={() => setDashboardOpen((prev) => !prev)}
                className={`${navLinkClass} flex items-center gap-1 cursor-pointer`}
              >
                Dashboard
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${dashboardOpen ? "rotate-180 text-purple-500" : ""}`}
                />
              </button>

              <div
                className={`absolute top-full left-0 mt-4 w-60 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-100 dark:border-purple-500/20 py-2 overflow-hidden transition-all duration-300 origin-top-left ${dashboardOpen ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible"}`}
              >
                {dashboardLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDashboardOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4 text-purple-500" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Activities Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                setCompleted(getCompletedActivities());
                setActivitiesOpen((prev) => !prev);
              }}
              className={`${navLinkClass} flex items-center gap-1 cursor-pointer`}
            >
              Activities
              {mounted && <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${activitiesOpen ? "rotate-180 text-purple-500" : ""}`}
              />}
            </button>

            <div
              className={`absolute top-full left-0 mt-4 w-52 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-100 dark:border-purple-500/20 py-2 overflow-hidden transition-all duration-300 origin-top-left ${activitiesOpen ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible"}`}
            >
              {activityLinks.map((item) => {
                const done = mounted && completed.includes(item.href);
                if (done) {
                  return (
                    <span
                      key={item.href}
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-400 dark:text-gray-500 cursor-not-allowed bg-gray-50/50 dark:bg-gray-800/20"
                    >
                      {item.label}
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    </span>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setActivitiesOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <Link href="/about" className={navLinkClass}>
            About Us
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/contact" className={navLinkClass}>
            Contact Us
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/terms" className={navLinkClass}>
            Terms & Conditions
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE: Auth, Profile, & Theme Toggle */}
      <div className="flex items-center gap-4">
        {mounted &&
          (isAuthenticated ? (
            <div className="flex items-center gap-4">
              {/* Profile Picture & Details Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="relative group rounded-full p-1 border-2 border-transparent hover:border-purple-500 transition-all duration-300 cursor-pointer"
                >
                  {user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover shadow-md"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                  <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                </button>

                {/* User Details Dropdown */}
                <div
                  className={`absolute top-full right-0 mt-3 w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-300 origin-top-right ${profileOpen ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible"}`}
                >
                  <div className="p-4 border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-black/20">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                      {user?.name || user?.username || "User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1 truncate">
                      <Mail className="w-3 h-3 shrink-0" />
                      {user?.email || "No email provided"}
                    </p>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Account Settings
                    </Link>
                  </div>
                </div>
              </div>

              {/* Signout Button Beside Profile */}
              <button
                onClick={handleSignOut}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors duration-300 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-white/5 rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          ))}

        {/* Theme Toggle Button */}
        <button
          id="theme-toggle"
          className="shrink-0 p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-transparent dark:border-white/5 transition-all duration-300 text-lg leading-none shadow-sm cursor-pointer"
          aria-label="Toggle theme"
        >
          <span className="inline dark:hidden">🌙</span>
          <span className="hidden dark:inline">☀️</span>
        </button>
      </div>
    </nav>
  );
}
