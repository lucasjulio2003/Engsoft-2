// Função para navegar entre telas
function showScreen(screenId) {
    // Remove classe 'active' de todas as telas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Adiciona classe 'active' na tela desejada
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Navegação do Login para Home
function goToHome() {
    // Validar campos de login
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (emailInput && passwordInput) {
        if (!emailInput.value.trim()) {
            alert('Por favor, preencha o email');
            emailInput.focus();
            return;
        }
        if (!passwordInput.value.trim()) {
            alert('Por favor, preencha a senha');
            passwordInput.focus();
            return;
        }
    }

    showScreen('home-screen');
}

// Navegação para tela de "Esqueci a senha"
function goToForgotPassword() {
    showScreen('forgot-password-screen');
}

// Navegação para tela de ajuda
function goToHelp() {
    showScreen('help-screen');
}

// Navegação de volta para o login
function goToLogin() {
    showScreen('login-screen');
}

// Navegação para tela de busca vazia
function goToSearch() {
    showScreen('search-screen');
}

// Navegação para formulário
function goToForm() {
    showScreen('form-screen');
}

// Navegação para upload de arquivos
function goToFileUpload() {
    // Validar campos obrigatórios do formulário
    const materia = document.getElementById('materia');
    const professor = document.getElementById('professor');
    const semestre = document.getElementById('semestre');
    const tipoConteudo = document.getElementById('tipo-conteudo');
    
    if (materia && professor && semestre && tipoConteudo) {
        if (!materia.value.trim()) {
            alert('Por favor, preencha o campo Matéria');
            materia.focus();
            return;
        }
        if (!professor.value.trim()) {
            alert('Por favor, preencha o campo Professor');
            professor.focus();
            return;
        }
        if (!semestre.value.trim()) {
            alert('Por favor, preencha o campo Semestre');
            semestre.focus();
            return;
        }
        if (!tipoConteudo.value || tipoConteudo.value === '') {
            alert('Por favor, selecione o Tipo de Conteúdo');
            tipoConteudo.focus();
            return;
        }
    }
    
    showScreen('file-upload-screen');
}

// Navegação de volta para o formulário após anexar arquivos
function goBackToFormFromUpload() {
    // Verificar se o arquivo da prova foi anexado
    const provaBox = document.querySelector('#file-upload-screen .upload-section .upload-box');
    const gabaritoCheckbox = document.getElementById('gabarito');
    const gabaritoBox = document.querySelector('#gabarito-upload-section .upload-box');
    
    // Verificar se a prova foi enviada
    if (!provaBox || !provaBox.classList.contains('uploaded')) {
        alert('Por favor, anexe o arquivo da prova');
        return;
    }
    
    // Verificar se o gabarito foi marcado mas não foi enviado
    if (gabaritoCheckbox && gabaritoCheckbox.checked) {
        if (!gabaritoBox || !gabaritoBox.classList.contains('uploaded')) {
            alert('Por favor, anexe o arquivo do gabarito ou desmarque a opção');
            return;
        }
    }
    
    // Voltar para o formulário
    showScreen('form-screen');
    
    // Habilitar o botão de enviar
    const enviarBtn = document.querySelector('#form-screen .btn-primary');
    if (enviarBtn) {
        enviarBtn.disabled = false;
        enviarBtn.style.opacity = '1';
        enviarBtn.style.cursor = 'pointer';
        enviarBtn.textContent = 'Enviar';
        enviarBtn.onclick = goToConfirmation;
    }
}

// Navegação para confirmação
function goToConfirmation() {
    showScreen('confirmation-screen');
    
    // Limpar formulário
    if (document.getElementById('materia')) document.getElementById('materia').value = '';
    if (document.getElementById('professor')) document.getElementById('professor').value = '';
    if (document.getElementById('semestre')) document.getElementById('semestre').value = '';
    if (document.getElementById('tipo-conteudo')) document.getElementById('tipo-conteudo').value = '';
    
    // Desabilitar botão de enviar novamente
    const enviarBtn = document.querySelector('#form-screen .btn-primary');
    if (enviarBtn) {
        enviarBtn.disabled = true;
        enviarBtn.style.opacity = '0.6';
        enviarBtn.style.cursor = 'not-allowed';
        enviarBtn.onclick = goToFileUpload;
    }
    
    // Limpar uploads
    document.querySelectorAll('.upload-box').forEach(box => {
        box.classList.remove('uploaded');
        box.innerHTML = `
            <svg width="40" height="40" viewBox="0 0 40 40">
                <rect x="10" y="8" width="20" height="24" rx="2" fill="none" stroke="#999" stroke-width="2"/>
                <path d="M 20 18 L 20 12 M 17 15 L 20 12 L 23 15" fill="none" stroke="#999" stroke-width="2"/>
            </svg>
        `;
    });
    
    // Desmarcar checkbox do gabarito
    const gabaritoCheckbox = document.getElementById('gabarito');
    if (gabaritoCheckbox) {
        gabaritoCheckbox.checked = false;
    }
}

// Simular busca quando digitar no campo
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('#home-screen .search-bar input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                // Simula busca sem resultados
                goToSearch();
            }
        });
    }
});

// Adicionar interatividade aos cards de material
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Feedback visual
            const original = this.innerHTML;
            this.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M 5 13 L 10 18 L 19 7" fill="none" stroke="#4ECDC4" stroke-width="3"/>
                </svg>
            `;
            
            setTimeout(() => {
                this.innerHTML = original;
            }, 1500);
        });
    });
    
    // Like buttons
    const likeButtons = document.querySelectorAll('.likes');
    
    likeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const currentLikes = parseInt(this.textContent);
            const isLiked = this.classList.contains('liked');
            
            if (isLiked) {
                this.textContent = `${currentLikes - 1} 👍`;
                this.classList.remove('liked');
            } else {
                this.textContent = `${currentLikes + 1} 👍`;
                this.classList.add('liked');
            }
        });
        
        btn.style.cursor = 'pointer';
    });
    
    // Share buttons
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Feedback visual de compartilhamento
            const original = this.textContent;
            this.textContent = '✓';
            this.style.color = '#4ECDC4';
            
            setTimeout(() => {
                this.textContent = original;
                this.style.color = '';
            }, 1500);
        });
    });
});

// Validação do formulário
document.addEventListener('DOMContentLoaded', function() {
    const formScreen = document.getElementById('form-screen');
    
    if (formScreen) {
        const inputs = formScreen.querySelectorAll('.form-input');
        const enviarBtn = formScreen.querySelector('.btn-primary');
        
        // Função para verificar se todos os campos estão preenchidos
        function checkFormValidity() {
            let allFilled = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    allFilled = false;
                }
            });
            
            return allFilled;
        }
        
        // Adicionar listeners nos inputs
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (checkFormValidity()) {
                    enviarBtn.style.opacity = '1';
                    enviarBtn.style.cursor = 'pointer';
                } else {
                    enviarBtn.style.opacity = '0.6';
                    enviarBtn.style.cursor = 'not-allowed';
                }
            });
        });
    }
});

// Simular seleção de arquivos
document.addEventListener('DOMContentLoaded', function() {
    const uploadBoxes = document.querySelectorAll('.upload-box');
    
    uploadBoxes.forEach(box => {
        box.addEventListener('click', function() {
            // Simular seleção de arquivo
            this.style.borderColor = '#4ECDC4';
            this.style.background = '#f0fffe';
            
            // Adicionar ícone de check e classe uploaded
            this.classList.add('uploaded');
            this.innerHTML = `
                <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="18" fill="#4ECDC4"/>
                    <path d="M 12 20 L 17 25 L 28 14" fill="none" stroke="white" stroke-width="3"/>
                </svg>
            `;
        });
    });
});

// Easter egg: clicar no logo volta para o login
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.addEventListener('dblclick', function() {
            showScreen('login-screen');
        });
    }
});

// Adicionar efeito de toque nos botões
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        btn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Função para simular carregamento
function showLoading(callback, duration = 1000) {
    // Aqui você poderia adicionar um overlay de loading
    setTimeout(callback, duration);
}

// Exemplo de uso com as navegações
function goToHomeWithLoading() {
    showLoading(() => {
        goToHome();
    }, 500);
}

// Adicionar transições suaves entre telas
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .screen {
            transition: opacity 0.3s ease-in-out;
        }
        
        .screen:not(.active) {
            opacity: 0;
            pointer-events: none;
        }
        
        .screen.active {
            opacity: 1;
            pointer-events: auto;
        }
    `;
    document.head.appendChild(style);
    
    // Controlar visibilidade do campo de upload do gabarito
    const gabaritoCheckbox = document.getElementById('gabarito');
    const gabaritoUploadSection = document.getElementById('gabarito-upload-section');
    
    if (gabaritoCheckbox && gabaritoUploadSection) {
        // Função para atualizar visibilidade
        function updateGabaritoVisibility() {
            if (gabaritoCheckbox.checked) {
                gabaritoUploadSection.style.display = 'block';
            } else {
                gabaritoUploadSection.style.display = 'none';
            }
        }
        
        // Inicializar visibilidade
        updateGabaritoVisibility();
        
        // Adicionar listener para mudanças
        gabaritoCheckbox.addEventListener('change', updateGabaritoVisibility);
    }
});

// Prevenir scroll no body quando dentro do phone
document.addEventListener('DOMContentLoaded', function() {
    const phoneContainer = document.querySelector('.phone-container');
    
    if (phoneContainer) {
        phoneContainer.addEventListener('touchmove', function(e) {
            e.stopPropagation();
        }, { passive: true });
    }
});

// Adicionar funcionalidade de voltar com tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeScreen = document.querySelector('.screen.active');
        
        if (activeScreen) {
            const screenId = activeScreen.id;
            
            switch(screenId) {
                case 'home-screen':
                    showScreen('login-screen');
                    break;
                case 'search-screen':
                case 'form-screen':
                    goToHome();
                    break;
                case 'file-upload-screen':
                    goToForm();
                    break;
                case 'confirmation-screen':
                    goToHome();
                    break;
            }
        }
    }
});

// Log de navegação para debug
function showScreen(screenId) {
    console.log(`Navegando para: ${screenId}`);
    
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // Scroll para o topo da nova tela
        const content = targetScreen.querySelector('.content');
        if (content) {
            content.scrollTop = 0;
        }
    }
}

// Mensagem inicial no console
console.log('%c🎓 UFBArchive Protótipo', 'color: #4ECDC4; font-size: 20px; font-weight: bold;');
console.log('%cProtótipo de alta fidelidade - Engenharia de Software 2', 'color: #666; font-size: 12px;');
console.log('%cDica: Pressione ESC para voltar entre telas', 'color: #999; font-size: 10px;');
