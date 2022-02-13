/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export const attachmentActions = {
  previewAttachment({ id, name, partName }) {
    return async (dispatch, getState) => {
      let msgUri = await browser.conversations.getMessageUriForId(id);
      let searchParams = new URLSearchParams({
        msgUri,
        partName,
      });
      await browser.tabs.create({
        url: `/gallery/index.html?${searchParams.toString()}`,
        windowId: getState().summary.windowId,
      });
    };
  },
  downloadAll({ id }) {
    return async () => {
      await browser.conversations.downloadAllAttachments(id);
    };
  },
  downloadAttachment({ id, partName }) {
    return async () => {
      await browser.conversations.downloadAttachment(id, partName);
    };
  },
  openAttachment({ id, partName }) {
    return async () => {
      await browser.conversations.openAttachment(id, partName);
    };
  },
  detachAttachment({ id, partName, shouldSave }) {
    return async () => {
      await browser.conversations.detachAttachment(id, partName, shouldSave);
    };
  },
  showGalleryView({ id }) {
    return async (dispatch, getState) => {
      let msgUri = await browser.conversations.getMessageUriForId(id);
      await browser.tabs.create({
        url: "/gallery/index.html?msgUri=" + encodeURIComponent(msgUri),
        windowId: getState().summary.windowId,
      });
    };
  },
};
