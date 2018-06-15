export class SmileModel {
  constructor(
    public code: string,
    public image: string
  ){}
}

var SMILES: Array<SmileModel> = [
  {code: "&S1#", image: "assets/imgs/smiles/glad.png"},
  {code: "&S2#", image: "assets/imgs/smiles/confused.png"},
  {code: "&S3#", image: "assets/imgs/smiles/smile.png"},
  {code: "&S4#", image: "assets/imgs/smiles/smiling.png"}
]

export {SMILES};
