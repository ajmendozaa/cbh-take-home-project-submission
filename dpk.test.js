const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns '58' when given an input with partitionKey", () => {
    let event = {
      partitionKey: 58,
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("58");
  });
  it("Returns 'null' when max length is exceeded", () => {
    let event = {
      partitionKey: 595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959595959,
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("null");
  });
});
