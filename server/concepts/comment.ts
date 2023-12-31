import { Filter, ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { BadValuesError, NotAllowedError, NotFoundError } from "./errors";

export interface CommentDoc extends BaseDoc {
  author: ObjectId;
  post: ObjectId;
  content: string;
  parent?: ObjectId;
  children?: ObjectId[];
}

export default class CommentConcept {
  public readonly comments = new DocCollection<CommentDoc>("comments");

  async create(author: ObjectId, post: ObjectId, content: string, parent?: ObjectId) {
    let _id;
    if (parent) {
      _id = await this.comments.createOne({ author, post, content, parent });
      const parentComment = await this.comments.readOne({ _id: parent });

      if (parentComment) {
        if (parentComment.post.toString() !== post.toString()) {
          throw new BadValuesError("The parent comment is not under the same post!");
        }
        parentComment.children = parentComment.children ? [...parentComment.children, _id] : [_id];
      } else {
        throw new NotFoundError("Parent comment not found!");
      }

      // Update the parent comment
      await this.comments.updateOne({ _id: parent }, parentComment);
    } else {
      _id = await this.comments.createOne({ author, post, content });
    }

    await this.canCreate(post, content);
    return { msg: "Comment successfully added!", comment: await this.comments.readOne({ _id }) };
  }

  async getChildrenComments(parent: ObjectId) {
    const parentComment = await this.comments.readOne({ _id: parent });
    if (!parentComment) {
      throw new NotFoundError(`Comment ${parent} does not exist!`);
    }
    const childrenComments = await this.comments.readMany({ _id: { $in: parentComment.children || [] } });
    return childrenComments;
  }

  private async canCreate(post: ObjectId, content: string, parentCommentId?: ObjectId) {
    if (!post || !content) {
      throw new BadValuesError("post and Content must be non-empty!");
    }
  }

  async delete(_id: ObjectId) {
    await this.comments.deleteOne({ _id });
    return { msg: "Comment successfully deleted!" };
  }

  async isAuthor(user: ObjectId, _id: ObjectId) {
    const comment = await this.comments.readOne({ _id });
    if (!comment) {
      throw new NotFoundError(`Comment ${_id} does not exist!`);
    }
    if (comment.author.toString() !== user.toString()) {
      throw new BadValuesError("You are not the author of this comment!");
    }
  }

  async getComments(query: Filter<CommentDoc>, parentOnly: boolean = true) {
    if (parentOnly) {
      query.parent = { $exists: false };
    }
    const comments = await this.comments.readMany(query, {
      sort: { dateUpdated: -1 },
    });
    return comments;
  }

  async getComment(_id: ObjectId) {
    const comment = await this.comments.readOne({ _id });
    if (comment === null) {
      throw new NotFoundError(`Comment not found!`);
    }
  }

  async getByPost(post: ObjectId) {
    return await this.getComments({ post });
  }

  async getByAuthor(post: ObjectId, author: ObjectId) {
    return await this.getComments({ post, author });
  }

  async update(_id: ObjectId, update: Partial<CommentDoc>) {
    this.sanitizeUpdate(update);

    await this.getComment(_id);
    await this.comments.updateOne({ _id }, update);
    return { msg: "Comment successfully updated!" };
  }

  private sanitizeUpdate(update: Partial<CommentDoc>) {
    if (update.content === null) {
      throw new BadValuesError("Please enter something to update!");
    }

    const allowedUpdates = ["content"];
    for (const key in update) {
      if (!allowedUpdates.includes(key)) {
        throw new NotAllowedError(`Cannot update '${key}' field!`);
      }
    }
  }
}
