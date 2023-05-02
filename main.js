// Создаем кнопку для подключения кошелька Phantom
const connectButton = document.createElement('button');
connectButton.textContent = 'Подключить Phantom';
document.body.appendChild(connectButton);

// Создаем кнопку для создания транзакции на 1 SOL
const transactionButton = document.createElement('button');
transactionButton.textContent = 'Создать транзакцию на 1 SOL';
document.body.appendChild(transactionButton);

// Обработчик нажатия на кнопку подключения кошелька Phantom
connectButton.onclick = async () => {
  if (window.solana && window.solana.isPhantom) {
    try {
      await window.solana.connect();
      console.log('Кошелек Phantom подключен!');
    } catch (e) {
      console.error(e);
    }
  } else {
    console.error('Phantom не найден!');
  }
};

// Обработчик нажатия на кнопку создания транзакции на 1 SOL
transactionButton.onclick = async () => {
  const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
  const transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey: window.solana.publicKey,
      toPubkey: '6NuHtWYfzxDqSnFVDKPXmQiEKxYKb2uXg6qrciZYyMWL', // Замените на публичный ключ получателя
      lamports: solanaWeb3.LAMPORTS_PER_SOL, // Отправляем 1 SOL
    }),
  );

  try {
    const signature = await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [window.solana]);
    console.log('Транзакция успешно создана! Signature:', signature);
  } catch (e) {
    console.error(e);
  }
};
