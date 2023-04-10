# Weidy

This project is based on `Aries` framework, so firstly please follow the [instruction](https://aries.js.org/guides/getting-started/installation) before going deeply

## Running
```bash
npm run start:dev:issue       # run as issuer
npm run start:dev:holder      # run as holder
npm run start:dev:verifier    # run as verifier
```

## Workflow

### Issuing Identity

1. Both Issuer, Holder, Verifier login to their own applications

    1.1. If credential schema & definittion are not created, Issuer must create new schema & credential definition

2. Issuer invite Holder for connection (Out-of-band)

3. Holder accept connecting invitation

4. Issuer create credential offer & send it to Holder via the connection

5. Holder accept & store the credential

### Verifying Identity

1. Verifier invite Holder for connection (Out-of-band)

2. Holder accept connecting invitation

3. Verifier create proof request & send it to Holder via the connection

4. Holder build proof from credentials & send the proof to Verifier via the connection

5. Verifier can views & verify the proof


### Testing APIs using Postman
1. Open Postman
2. Select import files name <actor-name>.postman_collection.json in the following path: regov-test/section2/weidy-main
3. Run APIs in order start from 01-Login in Issuer's Collection
