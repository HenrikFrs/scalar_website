// Sending infrastructure and contact data needed for a monthly lead volume,
// and what it costs.
// Used by the ROI calculator.

export const EMAILS_PER_LEAD = 2;
export const INBOXES_PER_DOMAIN = 25;
export const EMAILS_PER_INBOX_PER_DAY = 4;
export const SENDING_DAYS = 21;
export const EMAILS_PER_DOMAIN =
  INBOXES_PER_DOMAIN * EMAILS_PER_INBOX_PER_DAY * SENDING_DAYS;
export const INBOX_COST_PER_DOMAIN = 25;
export const DOMAIN_PRICE = 10.55;
// Backup domains sit in warmup (not sending), sized relative to active domains
export const BACKUP_DOMAIN_RATIO = 0.5;
// Domains are rotated out every 3 months, so each purchase is amortized over
// that period
export const DOMAIN_ROTATION_MONTHS = 3;
export const DOMAIN_ONLY_MONTHLY_COST = DOMAIN_PRICE / DOMAIN_ROTATION_MONTHS;
export const ACTIVE_DOMAIN_MONTHLY_COST =
  INBOX_COST_PER_DOMAIN + DOMAIN_ONLY_MONTHLY_COST;
// Backup domains get their own inboxes too, so they cost the same as active ones
export const BACKUP_DOMAIN_MONTHLY_COST = ACTIVE_DOMAIN_MONTHLY_COST;

// Contact data from AI-Ark: one $79 plan per client, whatever the lead volume
export const DATA_MONTHLY_COST = 79;

export const getInfra = (leads) => {
  const emailsSent = leads * EMAILS_PER_LEAD;
  const activeDomains = Math.ceil(emailsSent / EMAILS_PER_DOMAIN);
  const backupDomains = Math.ceil(activeDomains * BACKUP_DOMAIN_RATIO);
  const domains = activeDomains + backupDomains;
  const domainCost =
    activeDomains * ACTIVE_DOMAIN_MONTHLY_COST +
    backupDomains * BACKUP_DOMAIN_MONTHLY_COST;
  return {
    emailsSent,
    activeDomains,
    backupDomains,
    domains,
    inboxes: domains * INBOXES_PER_DOMAIN,
    domainCost,
    monthlyCost: domainCost + DATA_MONTHLY_COST,
  };
};
