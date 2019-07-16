export class MockDateService {
  public currentDate!: Date;

  public getCurrentDate() {
    return this.currentDate;
  }
}
