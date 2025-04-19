const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const btnFoto = document.getElementById('btn-foto');
const btnSalvar = document.getElementById('btn-salvar');

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
      audio: false
    });
    video.srcObject = stream;
  } catch (error) {
    alert('Erro ao acessar a câmera: ' + error.message);
  }
}

btnFoto.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Captura o vídeo
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Carrega e desenha o frame
  const frame = new Image();
  frame.src = 'frame.png';
  frame.onload = () => {
    context.drawImage(frame, 0, 0, canvas.width, canvas.height);
    
    const dataURL = canvas.toDataURL('image/png');
    btnSalvar.href = dataURL;
  };
});

startCamera();
