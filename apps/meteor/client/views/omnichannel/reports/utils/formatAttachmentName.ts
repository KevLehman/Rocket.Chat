export const formatAttachmentName = (attachmentName: string, start: string, end: string): string =>
	`${attachmentName.toLocaleLowerCase().replaceAll(/ /g, '_')}_${start}_${end}`;
