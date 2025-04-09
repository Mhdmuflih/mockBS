export interface IAdminPremiumRepository {
    getPremiumProfit(): Promise<number>
    getPremiumData(): Promise<any>
}