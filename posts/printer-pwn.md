# Printers Are C2 Now

So I found this Konica Minolta...

> Always assume office printers are compromised.
> This is a multi-line insight.

Here's the command:

```bash
smbclient //printer/scans -N
smb: \> get invoice.pdf