export const parseOutboundPhoneNumber = (phoneNumber: string | undefined): string => (phoneNumber ? phoneNumber.replaceAll(/\*/g, '+') : '');
