const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  // Map of constants. Instead of having multiple variables for constants we simply have a map of constants which we can add or remove constants as needed by our program.
  const constants = new Map([
    ["TRIVIAL_PARTITION_KEY", "0"],
    ["MAX_PARTITION_KEY_LENGTH", 256]
  ])

  // Initialize candidate to be an empty string so we make sure that in the worst case scenario we return an empty string
  let candidate = ""

  // Removed the multiple if/else statements and made one single if statement that checks for the condition and then have a ternary operation to assign the value of candidate
  if (event) {
    const data = JSON.stringify(event);
    candidate = event.partitionKey ? event.partitionKey : crypto.createHash("sha3-512").update(data).digest("hex");
  }

  // Instead of having an if/else statement here to check for candidate type, we simply have a ternary operation to assign the value of candidate depending on which condition is met
  candidate = typeof candidate !== "string" ? JSON.stringify(candidate) : constants.get("TRIVIAL_PARTITION_KEY");


  if (candidate.length > constants.get("MAX_PARTITION_KEY_LENGTH")) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};