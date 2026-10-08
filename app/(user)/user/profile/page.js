'use client';

import Axios from '@/lib/axios';
import { useEffect, useState } from 'react';
import { CalendarDays, Check, CircleUserRound, Mail, ShieldCheck } from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    let isCurrentRequest = true;

    const loadProfile = async () => {
      try {
        const response = await Axios.get('/auth/me');
        if (!isCurrentRequest) return;

        if (response?.data?.success) {
          setUser(response.data.user || response.data.data || null);
        } else {
          setError(response?.data?.message || 'We could not load your profile.');
        }
      } catch (requestError) {
        if (isCurrentRequest) {
          setError(requestError?.response?.data?.message || 'We could not load your profile. Please try again.');
        }
      } finally {
        if (isCurrentRequest) setLoading(false);
      }
    };

    loadProfile();
    return () => {
      isCurrentRequest = false;
    };
  }, [requestId]);

  const initials = user?.name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'U';

  const memberSince = user?.createdAt
    ? new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(new Date(user.createdAt))
    : 'Not available';

  const retryFetchProfile = () => {
    setLoading(true);
    setError('');
    setRequestId((currentId) => currentId + 1);
  };

  return (
    <div className="mx-auto max-w-[1100px] space-y-7 p-4 pb-10 sm:p-6 lg:p-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-700">Your account</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Profile</h1>
        <p className="mt-2 text-sm text-slate-500">Your personal details and account information.</p>
      </header>

      {loading ? (
        <section aria-label="Loading profile" className="animate-pulse overflow-hidden rounded-md border border-slate-200 bg-white">
          <div className="h-36 bg-slate-100" />
          <div className="space-y-4 p-6">
            <div className="h-6 w-40 rounded bg-slate-100" />
            <div className="h-4 w-56 rounded bg-slate-100" />
          </div>
        </section>
      ) : error ? (
        <section role="alert" className="rounded-md border border-red-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">Profile unavailable</h2>
          <p className="mt-2 text-sm text-slate-600">{error}</p>
          <button
            type="button"
            onClick={retryFetchProfile}
            className="mt-5 inline-flex min-h-10 items-center rounded-md bg-orange-700 px-4 text-sm font-medium text-white transition hover:bg-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
          >
            Try again
          </button>
        </section>
      ) : user ? (
        <>
          <section className="overflow-hidden rounded-md border border-slate-200 bg-white">
            <div className="h-32 bg-[linear-gradient(115deg,#fef3c7_0%,#ffedd5_48%,#ecfdf5_100%)] sm:h-40" />
            <div className="flex flex-col gap-4 px-5 pb-6 sm:flex-row sm:items-end sm:justify-between sm:px-7">
              <div className="-mt-11 flex min-w-0 items-end gap-4 sm:-mt-12">
                <div className="grid size-24 shrink-0 place-items-center rounded-md border-4 border-white bg-orange-700 text-3xl font-semibold text-white shadow-sm sm:size-28">
                  {initials}
                </div>
                <div className="min-w-0 pb-1">
                  <h2 className="truncate text-2xl font-semibold tracking-tight text-slate-950">{user.name || 'Library member'}</h2>
                  <p className="mt-1 truncate text-sm text-slate-500">{user.email}</p>
                </div>
              </div>
              <span className={`inline-flex w-fit items-center gap-2 rounded-sm px-3 py-1.5 text-xs font-semibold ${user.isActive ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                <span className={`size-1.5 rounded-full ${user.isActive ? 'bg-emerald-600' : 'bg-slate-400'}`} />
                {user.isActive ? 'Active account' : 'Inactive account'}
              </span>
            </div>
          </section>

          <section aria-labelledby="account-details-heading" className="overflow-hidden rounded-md border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
              <h2 id="account-details-heading" className="text-base font-semibold text-slate-900">Account details</h2>
              <p className="mt-1 text-sm text-slate-500">Information associated with your BookHub account.</p>
            </div>
            <dl className="divide-y divide-slate-100">
              <div className="flex items-start gap-4 px-5 py-5 sm:px-6">
                <CircleUserRound size={19} className="mt-0.5 shrink-0 text-orange-700" />
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between sm:gap-6">
                  <dt className="text-sm text-slate-500">Full name</dt>
                  <dd className="mt-1 break-words text-sm font-medium text-slate-900 sm:mt-0 sm:text-right">{user.name || 'Not provided'}</dd>
                </div>
              </div>
              <div className="flex items-start gap-4 px-5 py-5 sm:px-6">
                <Mail size={19} className="mt-0.5 shrink-0 text-sky-700" />
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between sm:gap-6">
                  <dt className="text-sm text-slate-500">Email address</dt>
                  <dd className="mt-1 break-all text-sm font-medium text-slate-900 sm:mt-0 sm:text-right">{user.email || 'Not provided'}</dd>
                </div>
              </div>
              <div className="flex items-start gap-4 px-5 py-5 sm:px-6">
                <ShieldCheck size={19} className="mt-0.5 shrink-0 text-emerald-700" />
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between sm:gap-6">
                  <dt className="text-sm text-slate-500">Account role</dt>
                  <dd className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium capitalize text-slate-900 sm:mt-0">{user.role || 'user'} <Check size={15} className="text-emerald-700" /></dd>
                </div>
              </div>
              <div className="flex items-start gap-4 px-5 py-5 sm:px-6">
                <CalendarDays size={19} className="mt-0.5 shrink-0 text-teal-700" />
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between sm:gap-6">
                  <dt className="text-sm text-slate-500">Member since</dt>
                  <dd className="mt-1 text-sm font-medium text-slate-900 sm:mt-0 sm:text-right">{memberSince}</dd>
                </div>
              </div>
            </dl>
          </section>
        </>
      ) : (
        <section className="rounded-md border border-slate-200 bg-white p-6 text-sm text-slate-600">
          No profile information is available for this account.
        </section>
      )}
    </div>
  )
}

export default ProfilePage
