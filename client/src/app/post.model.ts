export interface Post 
{
  _id?: string;
  firstname: string;
  lastname: string;
  hours: number;
  fundRaisingTriangle: number;
  journalCircle: number;
  communitySquare: number;
  preSessionPaw: number;
  extraHoursPaw: number;
  fundRaisingPaw: number;
  journalPaw: number;
  communityPaw: number;
  projectPaw: number;
  casual: boolean;
  juniorVarsity: boolean;
  varsity: boolean;
  targetVarsityHours: number;
}

export interface DocID 
{
  id: string;
}