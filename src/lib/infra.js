// Sending infrastructure and contact data needed for a monthly lead volume,
// and what it costs.
// Used by the ROI calculator.

export const EMAILS_PER_LEAD = 2;
export const INBOXES_PER_DOMAIN = 25;
export const EMAILS_PER_INBOX_PER_DAY = 3;
export const SENDING_DAYS = 21;
export const EMAILS_PER_DOMAIN =
  INBOXES_PER_DOMAIN * EMAILS_PER_INBOX_PER_DAY * SENDING_DAYS;
export const INBOX_COST_PER_DOMAIN = 25;
export const DOMAIN_PRICE = 10.55;
// Domains are rotated out every 3 months, so each purchase is amortized over
// that period
export const DOMAIN_ROTATION_MONTHS = 3;
export const DOMAIN_ONLY_MONTHLY_COST = DOMAIN_PRICE / DOMAIN_ROTATION_MONTHS;
export const DOMAIN_MONTHLY_COST =
  INBOX_COST_PER_DOMAIN + DOMAIN_ONLY_MONTHLY_COST;

// Contact data: paid per contact, so it scales with the leads reached
export const COST_PER_CONTACT = 0.01;

export const getInfra = (leads) => {
  const emailsSent = leads * EMAILS_PER_LEAD;
  const domains = Math.ceil(emailsSent / EMAILS_PER_DOMAIN);
  const domainCost = domains * DOMAIN_MONTHLY_COST;
  const dataCost = leads * COST_PER_CONTACT;
  return {
    emailsSent,
    domains,
    inboxes: domains * INBOXES_PER_DOMAIN,
    domainCost,
    dataCost,
    monthlyCost: domainCost + dataCost,
  };
};
