export const baseSchemaOptions = {
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
    },
  },
};
