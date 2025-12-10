import type { ListBlockChildrenResponse } from "@notionhq/client";

interface BlockType {
  id: string;
  title: string;
}

export function getBlocksData(blocks: ListBlockChildrenResponse) {
  let getIdAndTitle: BlockType[] = [];

  for (const block of blocks.results) {
    //@ts-ignore
    if (block?.child_database) {
      getIdAndTitle.push({
        id: block.id,
        //@ts-ignore
        title: block?.child_database.title,
      });
    }
  }

  return getIdAndTitle;
}
