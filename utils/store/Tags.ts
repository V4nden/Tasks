"use client";
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

export interface ITag {
  name: string;
  color: string;
  id: string;
}

class Tags {
  tags: ITag[] = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "TagsStore",
      properties: ["tags"],
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
    });
  }

  createTag(tag: ITag) {
    this.tags = [...this.tags, tag];
  }
  tagById(id: string): ITag {
    return this.tags.filter((el) => el.id == id)[0];
  }
  editTag(id: string, tag: ITag) {
    this.tags[this.tags.findIndex((el) => el.id == id)] = tag;
  }
  fromImported(data: any) {
    this.tags = data["TagsStore"]["tags"];
  }
}

export default new Tags();
