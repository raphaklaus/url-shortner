export default interface IRepository {
  create(data: any): Promise<any>;
  findUnique(query: { where: any }): Promise<any>;
  update(opts: { data: any; where: any }): Promise<any>;
}
