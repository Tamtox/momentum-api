import { AccessAttachment } from '../model/access-attachments.model';

export type CreateAttachmentData = Omit<AccessAttachment, 'id'> & Partial<Pick<AccessAttachment, 'id'>>;

export type UpdateAttachmentData = Pick<AccessAttachment, 'id'> & Partial<AccessAttachment>;
