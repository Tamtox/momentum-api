import { Body, Controller, HttpStatus, Res } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { setRequestProcessOptions } from 'src/common/utils/set_request_process_options';
import { Response } from 'express';

@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}
  // #region Create Attachment -----------------------------------------------------------------------------------------------------------
  async createAttachment(@Body(new ZodValidationPipe()) body: any, @Res() res: Response) {
    const routeName = 'createAttachment';
    const options = setRequestProcessOptions(res.locals);
    // const attachment = await this.attachmentsService.createAttachmentProcess(body, options);
    // return res.status(HttpStatus.CREATED).json({ attachment });
  }
  // #endregion
  // #region Update Attachment -----------------------------------------------------------------------------------------------------------
  // #endregion
  // #region Delete Attachment -----------------------------------------------------------------------------------------------------------
  // #endregion
  // #region List Attachments ------------------------------------------------------------------------------------------------------------
  // #endregion
}
