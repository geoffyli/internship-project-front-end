function isTokenExpired(token) {
  const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decoding base64 payload

  // Check if the token has an 'exp' claim
  if (tokenPayload.exp) {
    const expirationTimestamp = tokenPayload.exp;
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp

    return expirationTimestamp < currentTimestamp;
  }

  // If 'exp' claim is not present, assume token is not expired
  return false;
}

export { isTokenExpired};