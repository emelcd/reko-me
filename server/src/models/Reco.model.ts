import { Schema, model } from 'mongoose';
import IReco from '../interfaces/Reco.interface';

const RecoSchema = new Schema<IReco>({
  title: {
    type: String,
    required: true,
  },
  description: String,
  url: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  tags: [String],
  isPublic: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
  versionKey: false,
});

const Reco = model<IReco>('Reco', RecoSchema);

export default Reco;
