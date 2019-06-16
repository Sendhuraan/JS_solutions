In order to prevent from the inline events, we have to remove the script tags and inline events manually using Regex.

And to further improve security, we have to use `serialize` instead of JSON.stringify as used in this example.
