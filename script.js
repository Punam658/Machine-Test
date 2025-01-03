document.getElementById('userForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const uniqueID = generateUniqueID();
  const name = document.getElementById('name').value;
  const rank = document.getElementById('rank').value;
  const photoFile = document.getElementById('photo').files[0];
  document.getElementById('userName').textContent = name;
  document.getElementById('userRank').textContent = rank;
  document.getElementById('certificateID').textContent = 'ID: ' + uniqueID;
  if (photoFile) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const photoPreview = document.getElementById('photoPreview');
          photoPreview.innerHTML = `<img src="${e.target.result}" alt="User Photo">`;
      };
      reader.readAsDataURL(photoFile);
  }
  document.getElementById('formContainer').style.display = 'none';
  document.getElementById('certificate').style.display = 'block';
  document.getElementById('buttonContainer').style.display = 'block';
});

function generateUniqueID() {
  const id = Math.floor(100000 + Math.random() * 900000);
  return '#' + id;
}

function downloadPDF() {
  const element = document.getElementById('certificate');
  const options = {
      filename: 'certificate_' + document.getElementById('certificateID').textContent.replace('ID: ', '') + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { 
          unit: 'px',
          format: [960, 640],
          orientation: 'landscape'
      } 
  };
  setTimeout(() => {
      html2pdf().set(options).from(element).save();
  }, 500);
}

function generateNewCertificate() {
  document.getElementById('userForm').reset();
  document.getElementById('photoPreview').innerHTML = 'User Photo';
  document.getElementById('formContainer').style.display = 'block';
  document.getElementById('certificate').style.display = 'none';
  document.getElementById('buttonContainer').style.display = 'none';
}
