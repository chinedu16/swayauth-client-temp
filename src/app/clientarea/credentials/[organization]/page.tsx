"use client"
import AlertAction from "@/components/alert";
import DropDown from "@/components/dropDown";
import TableLoader from "@/components/tableLoader";
import { CONST } from "@/lib/constant";
import { normalRequest } from "@/lib/request";
import { copyText, cropString, dateLong } from "@/lib/utils";
import useOneOrganization from "@/store/hooks/oneOrganization";
import useOrganzationToken, { OrganizationTokenData } from "@/store/hooks/organizationToken";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft, faArrowUpRightFromSquare, faCheck,
  faEllipsisV, faPen, faPlus, faTrash, faXmark, faLink,
  faKey, faShield
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NProgress from 'nprogress';
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/modal";
import CreateCredModal from "../../../../components/clientarea/credentials/modals/createCred";
import EditOrg from "../../../../components/clientarea/credentials/modals/editOrg";

/* ─────────────────────────── helpers ─────────────────────────── */
const getUrls = (path: 'oauth' | 'b2b', t?: OrganizationTokenData | null) => {
  const appId = t?.id || '';
  const redirectUrl = t?.redirect_url || '';
  const query = new URLSearchParams();
  query.set('app_id', appId);
  if (redirectUrl) query.set('redirect_url', redirectUrl);
  query.set('default', 'login');
  if (t?.template) query.set('template', t.template);
  const login = `${CONST.AUTH_BASE_URL}/${path}?${query.toString()}`;
  query.set('default', 'register');
  const register = `${CONST.AUTH_BASE_URL}/${path}?${query.toString()}`;
  return { login, register };
};

/* ─────────────────────────── sub-components ─────────────────────────── */

/** Pill badge for scope / 2FA type tags */
const Tag = ({ label }: { label: string }) => (
  <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 mr-1 mb-0.5 capitalize">
    {label}
  </span>
);

/** Copy button with transient ✓ feedback */
const CopyBtn = ({ value, className = '' }: { value: string | undefined; className?: string }) => {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    copyText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={handle}
      title="Copy"
      className={`inline-flex items-center justify-center w-6 h-6 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors ${className}`}
    >
      <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={`text-xs ${copied ? 'text-emerald-500' : ''}`} />
    </button>
  );
};

/** Mono chip with truncated value + copy */
const MonoChip = ({ value }: { value: string | undefined }) => (
  <div className="flex items-center gap-1">
    <code className="text-xs font-mono text-slate-500 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 max-w-[10rem] truncate inline-block align-middle">
      {cropString(value, 18) || '—'}
    </code>
    <CopyBtn value={value} />
  </div>
);

/* ─────────────────────────── URL Preview Modal ─────────────────────────── */

const UrlPreviewModal = ({
  isOpen, data, toggle,
}: { isOpen: boolean; data?: OrganizationTokenData | null; toggle: () => void }) => {
  const urls = {
    b2c: getUrls('oauth', data),
    b2b: getUrls('b2b', data),
    forgot: `${CONST.CLIENT_BASE_URL}${CONST.LOCATION.FORGOT_PASSWORD}`,
  };
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, key: string) => {
    copyText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const sections: { icon: typeof faLink; title: string; color: string; url: string; id: string }[] = [
    { icon: faShield, title: 'B2C (Consumer)', color: 'blue',  url: urls.b2c.login,  id: 'b2c' },
    { icon: faKey,    title: 'B2B (Business)', color: 'violet', url: urls.b2b.login, id: 'b2b' },
    // { icon: faLink,   title: 'Forgot Password', color: 'amber', url: urls.forgot,    id: 'forgot' },
  ];

  const colorMap: Record<string, { bg: string; text: string; ring: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-100' },
    violet: { bg: 'bg-violet-50', text: 'text-violet-600', ring: 'ring-violet-100' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-100' },
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} center size="max-w-lg">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-semibold text-slate-800">Hosted Auth Links</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {data?.name ? `Token: ${data.name}` : 'All authentication entry-points'}
            </p>
          </div>
          <button
            onClick={toggle}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {sections.map((sec) => {
            const c = colorMap[sec.color];
            return (
              <div key={sec.id} className="rounded-xl border border-slate-100 overflow-hidden">
                {/* Section header */}
                <div className={`flex items-center justify-between px-4 py-3 ${c.bg}`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center ring-1 ${c.ring} ${c.bg} ${c.text}`}>
                      <FontAwesomeIcon icon={sec.icon} className="text-xs" />
                    </span>
                    <span className={`text-sm font-semibold ${c.text}`}>{sec.title}</span>
                  </div>
                  {/* Actions always visible in header */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(sec.url, sec.id)}
                      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border font-medium transition-all ${
                        copiedKey === sec.id
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <FontAwesomeIcon icon={copiedKey === sec.id ? faCheck : faCopy} className="text-[10px]" />
                      {copiedKey === sec.id ? 'Copied!' : 'Copy'}
                    </button>
                    <a
                      href={sec.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 font-medium transition-all"
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
                      Open
                    </a>
                  </div>
                </div>
                {/* URL strip */}
                <div className="px-4 py-2.5 bg-white">
                  <p className="font-mono text-xs text-slate-400 truncate" title={sec.url}>{sec.url}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

/* ─────────────────────────── main page ─────────────────────────── */
const Company = ({ params }: { params: { organization: string } }) => {
  const [credModal, setCredModal] = useState<{ open: boolean; data: OrganizationTokenData | null }>({ open: false, data: null });
  const [editModal, setEditModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; token_ids: string[] }>({ open: false, token_ids: [] });
  const [viewModal, setViewModal] = useState<{ open: boolean; data: OrganizationTokenData | null }>({ open: false, data: null });

  const router = useRouter();
  const { data, loading, message, updateData } = useOneOrganization(params.organization);
  const { data: token, loading: tokenLoading, addToTokenData, removeTokenData, updateTokenData } = useOrganzationToken(params.organization);

  const [useFallbackPhoto, setUseFallbackPhoto] = useState(false);
  useEffect(() => { setUseFallbackPhoto(false); }, [data?.photo]);

  const back = () => { NProgress.start(); router.back(); };
  const toggleDeleteTokens = (token_ids?: string[]) => setDeleteModal(p => ({ token_ids: token_ids ?? p.token_ids, open: !p.open }));
  const toggleCred = (data: OrganizationTokenData | null) => setCredModal(p => ({ data, open: !p.open }));
  const toggleEditCred = () => setEditModal(v => !v);
  const toggleView = (data: OrganizationTokenData | null) => setViewModal(p => ({ data, open: !p.open }));

  const deleteTokens = async (token_ids: string[]) => {
    if (!token_ids.length) { toast.error('Please select a token to delete'); return; }
    setDeleteLoading(true);
    const res = await normalRequest(CONST.COMPANY.ORGANIZATION.TOKEN.DELETE, { token_ids }, 'delete');
    setDeleteLoading(false);
    toast[res.status ? 'success' : 'error'](res.message);
    toggleDeleteTokens([]);
    if (res.status) removeTokenData(token_ids);
  };

  const checkAll = (e: ChangeEvent<HTMLInputElement>) =>
    setDeleteModal(p => ({
      ...p,
      token_ids: e.target.checked ? (token?.map(d => d.id) ?? []) as string[] : [],
    }));

  const checkAToken = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    setDeleteModal(p => ({
      ...p,
      token_ids: p.token_ids.includes(id) ? p.token_ids.filter(c => c !== id) : [...p.token_ids, id],
    }));
  };

  const fallbackAvatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  const selectedCount = deleteModal.token_ids.length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto py-6 px-4 md:px-8">

        {/* ── Page Header ── */}
        <div className="mb-8">
          <button
            onClick={back}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-700 font-medium mb-5 transition-colors group"
          >
            <span className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-200 group-hover:bg-blue-50 transition-all">
              <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
            </span>
            Back
          </button>

          <div className="bg-white rounded-2xl border border-slate-200 px-6 py-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-xl border-2 border-slate-100 overflow-hidden shadow-sm flex-shrink-0 bg-slate-100">
                {loading ? (
                  <div className="animate-pulse w-full h-full bg-slate-200" />
                ) : (
                  <Image
                    src={useFallbackPhoto ? fallbackAvatar : (data?.photo || fallbackAvatar)}
                    alt=""
                    className="object-cover w-full h-full"
                    width={112}
                    height={112}
                    onError={() => setUseFallbackPhoto(true)}
                  />
                )}
              </div>

              {/* Name + website */}
              <div>
                {loading ? (
                  <>
                    <div className="animate-pulse bg-slate-200 h-5 w-40 rounded-full mb-2" />
                    <div className="animate-pulse bg-slate-200 h-3 w-24 rounded-full" />
                  </>
                ) : (
                  <>
                    <h1 className="text-xl font-bold text-slate-800 truncate max-w-xs sm:max-w-md">
                      {data?.name || 'N/A'}
                    </h1>
                    <p className="text-sm text-slate-400 mt-0.5 truncate max-w-xs sm:max-w-md">
                      {data?.website || message?.substring(0, 60) || '—'}
                    </p>
                  </>
                )}
              </div>
            </div>

            <button
              disabled={loading}
              onClick={toggleEditCred}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <FontAwesomeIcon icon={faPen} className="text-xs" />
              <span>Edit Organisation</span>
            </button>
          </div>
        </div>

        {/* ── Tokens Table Card ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          {/* Card Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-800">API Tokens</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {tokenLoading
                  ? 'Loading…'
                  : token?.length
                    ? `${token.length} token${token.length !== 1 ? 's' : ''} · ${selectedCount > 0 ? `${selectedCount} selected` : 'none selected'}`
                    : 'No tokens yet'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Bulk delete button — visible when rows are checked */}
              {selectedCount > 0 && (
                <button
                  onClick={() => toggleDeleteTokens()}
                  className="inline-flex items-center gap-2 text-sm font-medium text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-xs" />
                  Delete {selectedCount}
                </button>
              )}

              {/* Create token */}
              <button
                onClick={() => toggleCred(null)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                <FontAwesomeIcon icon={faPlus} className="text-xs" />
                <span className="hidden sm:inline">New Token</span>
                <span className="sm:hidden">New</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  <th className="px-5 py-3 w-10">
                    <input
                      type="checkbox"
                      onChange={checkAll}
                      className="w-4 h-4 accent-blue-600 cursor-pointer rounded"
                    />
                  </th>
                  <th className="px-4 py-3 w-10 text-center">#</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Scope</th>
                  <th className="px-4 py-3 whitespace-nowrap">Client ID</th>
                  <th className="px-4 py-3 whitespace-nowrap">Secret Key</th>
                  <th className="px-4 py-3 whitespace-nowrap">2FA Types</th>
                  <th className="px-4 py-3 whitespace-nowrap">Created</th>
                  <th className="px-4 py-3 w-28 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {tokenLoading ? (
                  <TableLoader row={9} />
                ) : token?.length ? (
                  token.map((item, i) => {
                    const isSelected = deleteModal.token_ids.includes(item.id as string);
                    return (
                      <tr
                        key={i}
                        className={`group transition-colors ${isSelected ? 'bg-blue-50' : 'hover:bg-slate-50/70'}`}
                      >
                        <td className="px-5 py-3.5">
                          <input
                            id={item.id}
                            type="checkbox"
                            onChange={checkAToken}
                            checked={isSelected}
                            className="w-4 h-4 accent-blue-600 cursor-pointer rounded"
                          />
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 text-xs text-center font-mono">{i + 1}</td>
                        <td className="px-4 py-3.5">
                          <span className="font-medium text-slate-700 whitespace-nowrap">{item.name}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex flex-wrap gap-0.5 max-w-[12rem]">
                            {item.scope?.length
                              ? item.scope.map(s => <Tag key={s} label={s} />)
                              : <span className="text-slate-300 text-xs">—</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3.5"><MonoChip value={item.id} /></td>
                        <td className="px-4 py-3.5"><MonoChip value={item.api_key} /></td>
                        <td className="px-4 py-3.5">
                          <div className="flex flex-wrap gap-0.5 max-w-[12rem]">
                            {item.two_factor_type?.length
                              ? item.two_factor_type.map(t => <Tag key={t} label={t} />)
                              : <span className="text-slate-300 text-xs">—</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-slate-500 text-xs whitespace-nowrap">{dateLong(item.created_at)}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">

                            {/* Edit */}
                            <button
                              disabled={deleteLoading}
                              onClick={() => toggleCred(item)}
                              title="Edit token"
                              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-40 transition-colors"
                            >
                              <FontAwesomeIcon icon={faPen} className="text-xs" />
                            </button>

                            {/* Delete */}
                            <button
                              disabled={deleteLoading}
                              onClick={() => toggleDeleteTokens([item.id as string])}
                              title="Delete token"
                              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-40 transition-colors"
                            >
                              <FontAwesomeIcon icon={faTrash} className="text-xs" />
                            </button>

                            {/* View Links */}
                            <button
                              onClick={() => toggleView(item)}
                              title="View auth links"
                              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                            >
                              <FontAwesomeIcon icon={faLink} className="text-xs" />
                            </button>

                            {/* Copy full JSON */}
                            <button
                              disabled={deleteLoading}
                              onClick={() => copyText(JSON.stringify(item, null, 2))}
                              title="Copy token JSON"
                              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                            >
                              <FontAwesomeIcon icon={faCopy} className="text-xs" />
                            </button>

                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9}>
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                          <FontAwesomeIcon icon={faKey} className="text-slate-300 text-lg" />
                        </div>
                        <p className="text-sm font-medium text-slate-500">No tokens yet</p>
                        <p className="text-xs text-slate-400 mt-1 mb-4">Create your first API token to get started.</p>
                        <button
                          onClick={() => toggleCred(null)}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                        >
                          <FontAwesomeIcon icon={faPlus} className="text-xs" />
                          Create Token
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      <CreateCredModal
        addToken={addToTokenData}
        token={credModal.data}
        editToken={updateTokenData}
        organization={params.organization}
        isOpen={credModal.open}
        toggle={() => toggleCred(null)}
      />

      <EditOrg
        getEditOrg={updateData}
        org={data}
        isOpen={editModal}
        toggle={toggleEditCred}
      />

      <AlertAction
        isOpen={deleteModal.open}
        loading={deleteLoading}
        title="Delete Tokens"
        toggle={() => toggleDeleteTokens([])}
        message={
          <span>
            Are you sure you want to{' '}
            <b className="text-red-500">permanently delete</b>{' '}
            {deleteModal.token_ids.length} token{deleteModal.token_ids.length !== 1 ? 's' : ''}?
            <br />
            <span className="text-slate-500 text-sm">This action cannot be undone.</span>
          </span>
        }
        action={() => deleteTokens(deleteModal.token_ids)}
      />

      <UrlPreviewModal
        isOpen={viewModal.open}
        data={viewModal.data}
        toggle={() => toggleView(null)}
      />
    </div>
  );
};

export default Company;