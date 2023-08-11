# MonKey Faucet

<p align="center">
  <img src="https://monkey.banano.cc/api/v1/monkey/ban_31jkmeb9qgmgwwet1ru7heut6biz6qejkcp3gn38i73fp8ake4b9kd5ezbcf?format=png&size=225&background=false" width="225" alt="Faucet MonKey">
  <div align="center">Banano faucet powered by AI</div>
</p>

## Usage

To use the faucet, you need to have a Banano address. If you don't have one, you can create one using [Kalium](https://kalium.banano.cc/) or [Vault](https://vault.banano.cc/).

Once you have your address, go to the [faucet](https://monkeyfaucet.com/) and enter your address. Convince the Faucet MonKey to send you some Banano!

## Development

### Requirements

- [Node.js](https://nodejs.org/en/)
- [MongoDB Atlas Account](https://www.mongodb.com/atlas/database/)
- [OpenAI API Key](https://platform.openai.com/)
- [reCAPTCHA v3 Site Key](https://www.google.com/recaptcha/)
- [Banano Account](https://banano.cc/#wallets)

### Installation

```bash
git clone https://github.com/altugbakan/monkey-faucet.git
cd monkey-faucet
npm install
```

### Configuration

Copy the `.env.example` file to `.env` and fill in the required values.

```bash
cp .env.example .env
```

### Running

Use the following command to start the development server.

```bash
npm run dev
```

## Build

This project is built using [SvelteKit](https://kit.svelte.dev/), [Tailwind CSS](https://tailwindcss.com/) and [Skeleton](https://skeleton.dev/).

## License

This project is licensed under the [MIT License](./LICENSE.md).

## Donations

Thank you for donating some Bananos!

<p align="center">
  <code>Banano: ban_1xredwjw5uyr13nuaheupdnt3ot1ttjmzo3p7dqb7w6638t71aoz3c9r91sw</code><br><br>
  <img src="https://user-images.githubusercontent.com/43248015/127350928-22eb3d7a-5e47-4ca5-b69a-98556b41bed7.png" width="225" alt="Thank you for donating!">
</p>
