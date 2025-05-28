export interface IAdminRepository {
    findTotalAmount(): Promise<number>
}