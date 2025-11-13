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

// Navegação para tela de seleção de matérias
function goToSubjects() {
    showScreen('subjects-screen');
    loadSubjects();
}

// Navegação para tela de seleção de professores
function goToProfessors() {
    showScreen('professors-screen');
    loadProfessors();
}

// Navegação para tela de seleção de cursos
function goToCourses() {
    showScreen('courses-screen');
    loadCourses();
}

// Navegação de volta para o login
function goToLogin() {
    showScreen('login-screen');
}

// Navegação para tela de busca vazia
function goToSearch(searchTerm = '') {
    showScreen('search-screen');

    // Atualizar o campo de busca com o termo pesquisado
    const searchInput = document.querySelector('#search-screen .search-bar input');
    if (searchInput) {
        searchInput.value = searchTerm || 'Pesquisa realizada';
    }
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
                // Simula busca sem resultados, passando o termo pesquisado
                const searchTerm = searchInput.value.trim();
                goToSearch(searchTerm);
            }
        });
    }
});

// Adicionar interatividade aos cards de material
document.addEventListener('DOMContentLoaded', function() {
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
            this.style.borderColor = '#63c5e5';
            this.style.background = '#f0fffe';
            
            // Adicionar ícone de check e classe uploaded
            this.classList.add('uploaded');
            this.innerHTML = `
                <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="18" fill="#63c5e5"/>
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
                case 'profile-screen':
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

// Lista de matérias do departamento de Ciência da Computação
const subjectsData = [
    { code: "MATF34", name: "ACCS:PROGRAMAÇÃO COMPETITIVA-COMPUTAÇÃO PARA ALUNOS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC88", name: "ADMINISTRAÇÃO DE REDES DE COMPUTADORES", type: "DISCIPLINA", hours: "45h" },
    { code: "MATA90", name: "ALGORITMOS DISTRIBUIDOS", type: "DISCIPLINA", hours: "45h" },
    { code: "MATC19", name: "ALGORÍTMOS E PROGRAMAÇÃO", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT053", name: "ANALISE DE PROJETO DE ALGORITMOS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC32", name: "ANÁLISE E PROJETO DE ALGORITMOS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA52", name: "ANÁLISE E PROJETO DE ALGORITMOS", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT162", name: "ANALISE E PROJETO DE SISTEMAS DE INFORMACAO I", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT163", name: "ANALISE E PROJETO DE SISTEMAS DE INFORMACAO II", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC89", name: "APLICAÇÕES PARA DISPOSITIVOS MÓVEIS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA48", name: "ARQUITETURA DE COMPUTADORES", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT151", name: "ARQUITETURA DE COMPUTADORES", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC29", name: "ARQUITETURA DE COMPUTADORES", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC34", name: "ARQUITETURAS DE SISTEMAS DISTRIBUÍDOS", type: "DISCIPLINA", hours: "45h" },
    { code: "MATA60", name: "BANCO DE DADOS", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT165", name: "BANCO DE DADOS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC35", name: "BANCO DE DADOS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATD05", name: "BANCO DE DADOS E APLICAÇÕES", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC18", name: "CÁLCULO NUMÉRICO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC90", name: "CIRCUITOS DIGITAIS E ARQUITETURA DE COMPUTADORES", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA61", name: "COMPILADORES", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT056", name: "COMPUTACAO GRAFICA", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA65", name: "COMPUTAÇÃO GRÁFICA", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC36", name: "COMPUTAÇÃO GRÁFICA", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT159", name: "COMPUTADORES E SOCIEDADE", type: "DISCIPLINA", hours: "45h" },
    { code: "MAT153", name: "CONSTRUCAO DE COMPILADORES", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT220", name: "EMPREENDEDORES EM INFORMATICA", type: "DISCIPLINA", hours: "60h" },
    { code: "MATB65", name: "EMPREENDIMENTOS E INFORMÁTICA", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT161", name: "ENGENHARIA DE PROGRAMACAO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA62", name: "ENGENHARIA DE SOFTWARE I", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC38", name: "ENGENHARIA DE SOFTWARE I", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC39", name: "ENGENHARIA DE SOFTWARE II", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA63", name: "ENGENHARIA DE SOFTWARE II", type: "DISCIPLINA", hours: "60h" },
    { code: "MATE11", name: "ENGENHARIA DE SOFTWARE II-A", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT152", name: "ESTRUTURAS DE ARQUIVOS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATD04", name: "ESTRUTURAS DE DADOS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA40", name: "ESTRUTURAS DE DADOS E ALGORITMOS I", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC37", name: "ESTRUTURAS DE DADOS E ALGORITMOS II", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA54", name: "ESTRUTURAS DE DADOS E ALGORITMOS II", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT052", name: "ESTUDO COMPARATIVO DE LINGUAGENS DE PROGRAMACAO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATB03", name: "EVOLUÇÃO DE SOFTWARE", type: "DISCIPLINA", hours: "45h" },
    { code: "MATC92", name: "FUNDAMENTOS DE SISTEMAS DE INFORMAÇÃO", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT054", name: "INTELIGENCIA ARTIFICIAL", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA64", name: "INTELIGÊNCIA ARTIFICIAL", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC40", name: "INTELIGÊNCIA ARTIFICIAL", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT146", name: "INTRODUCAO A LOGICA DE PROGRAMACAO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA37", name: "INTRODUÇÃO À LÓGICA DE PROGRAMAÇÃO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC73", name: "INTRODUÇÃO À LÓGICA MATEMÁTICA", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC93", name: "INTRODUÇÃO A WEB SEMÂNTICA", type: "DISCIPLINA", hours: "45h" },
    { code: "MAT150", name: "INTRODUCAO AOS SISTEMAS DE COMPUTACAO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC94", name: "INTRODUÇÃO AS LINGUAGENS FORMAIS E TEORIA DA COMPUTAÇÃO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATB17", name: "LAB. DE COMPUTAÇÃO GRÁFICA E PROCESSAMENTO DE IMAGENS", type: "DISCIPLINA", hours: "45h" },
    { code: "MATB09", name: "LABORATÓRIO DE BANCO DE DADOS", type: "DISCIPLINA", hours: "45h" },
    { code: "MATA73", name: "LABORATÓRIO DE CIRCUITOS DIGITAIS", type: "DISCIPLINA", hours: "45h" },
    { code: "MATB11", name: "LABORATÓRIO DE COMPILADORES", type: "DISCIPLINA", hours: "45h" },
    { code: "MATB14", name: "LABORATÓRIO DE ENGENHARIA DE SOFTWARE", type: "DISCIPLINA", hours: "45h" },
    { code: "MATB16", name: "LABORATÓRIO DE INTELIGÊNCIA ARTIFICIAL", type: "DISCIPLINA", hours: "45h" },
    { code: "MATA57", name: "LABORATÓRIO DE PROGRAMAÇÃO I", type: "DISCIPLINA", hours: "45h" },
    { code: "MATC30", name: "LABORATÓRIO DE PROGRAMAÇÃO I", type: "DISCIPLINA", hours: "30h" },
    { code: "MATA80", name: "LABORATÓRIO DE PROGRAMAÇÃO II", type: "DISCIPLINA", hours: "45h" },
    { code: "MATC84", name: "LABORATÓRIO DE PROGRAMAÇÃO WEB", type: "DISCIPLINA", hours: "45h" },
    { code: "MATB01", name: "LABORATÓRIO DE REDES DE COMPUTADORES", type: "DISCIPLINA", hours: "45h" },
    { code: "MATA84", name: "LABORATÓRIO DE REDES E COMPUTADORES", type: "DISCIPLINA", hours: "45h" },
    { code: "MATA81", name: "LABORATÓRIO DE SISTEMAS OPERACIONAIS", type: "DISCIPLINA", hours: "45h" },
    { code: "MAT149", name: "LINGUAGENS DE MONTAGEM", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT147", name: "LINGUAGENS DE PROGRAMACAO I", type: "DISCIPLINA", hours: "90h" },
    { code: "MAT148", name: "LINGUAGENS DE PROGRAMACAO II", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA50", name: "LINGUAGENS FORMAIS E AUTÔMATOS", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT157", name: "LINGUAGENS FORMAIS E TEORIA DA COMPILACAO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA76", name: "LINGUAGENS PARA APLICAÇÃO COMERCIAL", type: "DISCIPLINA", hours: "45h" },
    { code: "MATA47", name: "LÓGICA PARA COMPUTAÇÃO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATB13", name: "MÉTODOS FORMAIS", type: "DISCIPLINA", hours: "45h" },
    { code: "MATA69", name: "MODELAGEM E SIMULAÇÃO DE SISTEMAS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC41", name: "MODELAGEM E SIMULAÇÃO DE SISTEMAS", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT160", name: "MODELOS PROBABILISTICOS DE PESQUISA OPERACIONAL", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC96", name: "ORGANIZAÇÃO, GERENCIAMENTO E RECUPERAÇÃO DA INFORMAÇÃO", type: "DISCIPLINA", hours: "45h" },
    { code: "MATA56", name: "PARADIGMAS DE LINGUAGENS DE PROGRAMAÇÃO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC42", name: "PARADIGMAS DE LINGUAGENS DE PROGRAMAÇÃO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATE12", name: "PARADIGMAS DE LINGUAGENS DE PROGRAMAÇÃO A", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT045", name: "PROCESSAMENTO DE DADOS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATE13", name: "PROGRAMAÇÃO CONCORRENTE, DISTRIBUÍDA E PARALELA", type: "DISCIPLINA", hours: "45h" },
    { code: "MATA49", name: "PROGRAMAÇÃO DE SOFTWARE BÁSICO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC44", name: "PROGRAMAÇÃO DE SOFTWARE BÁSICO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA77", name: "PROGRAMAÇÃO FUNCIONAL", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT155", name: "PROGRAMACAO MATEMATICA", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC43", name: "PROGRAMAÇÃO ORIENTADA A OBJETOS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA55", name: "PROGRAMAÇÃO ORIENTADA A OBJETOS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA38", name: "PROJETO DE CIRCUITOS LÓGICOS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATB02", name: "QUALIDADE DE SOFTWARE", type: "DISCIPLINA", hours: "45h" },
    { code: "MAT055", name: "REDES DE COMPUTADORES", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC45", name: "REDES DE COMPUTADORES I", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA59", name: "REDES DE COMPUTADORES I", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA85", name: "REDES DE COMPUTADORES II", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC46", name: "REDES DE COMPUTADORES II", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC47", name: "ROBÓTICA INTELIGENTE", type: "DISCIPLINA", hours: "45h" },
    { code: "MATB24", name: "ROBÓTICA INTELIGENTE", type: "DISCIPLINA", hours: "45h" },
    { code: "MATC48", name: "SEGURANÇA DA INFORMAÇÃO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA87", name: "SEGURANÇA DA INFORMAÇÃO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC99", name: "SEGURANÇA E AUDITORIA DE SISTEMAS DE INFORMAÇÃO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA75", name: "SEMÂNTICA DE LINGUAGEM DE PROGRAMAÇÃO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATB23", name: "SEMINÁRIOS EM EMPREENDEDORISMO", type: "DISCIPLINA", hours: "45h" },
    { code: "MATC50", name: "SISTEMAS DE TEMPO REAL", type: "DISCIPLINA", hours: "60h" },
    { code: "MATB19", name: "SISTEMAS MULTIMÍDIA", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA58", name: "SISTEMAS OPERACIONAIS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC49", name: "SISTEMAS OPERACIONAIS", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT154", name: "SISTEMAS OPERACIONAIS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC82", name: "SISTEMAS WEB", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT164", name: "TELEPROCESSAMENTO", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT158", name: "TEORIA DA COMPUTACAO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA51", name: "TEORIA DA COMPUTAÇÃO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA53", name: "TEORIA DOS GRAFOS", type: "DISCIPLINA", hours: "60h" },
    { code: "MAT156", name: "TEORIA DOS GRAFOS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATC51", name: "TEORIA DOS GRAFOS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA72", name: "TÓPICOS EM ARQUITETURA DE COMPUTADORES", type: "DISCIPLINA", hours: "45h" },
    { code: "MATB10", name: "TÓPICOS EM BANCO DE DADOS", type: "DISCIPLINA", hours: "45h" },
    { code: "MAT167", name: "TOPICOS EM CIENCIA DA COMPUTACAO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATB12", name: "TÓPICOS EM COMPILADORES", type: "DISCIPLINA", hours: "45h" },
    { code: "MATA74", name: "TÓPICOS EM COMPUTAÇÃO E ALGORITMOS", type: "DISCIPLINA", hours: "45h" },
    { code: "MATB04", name: "TÓPICOS EM COMPUTAÇÃO GRÁFICA E PROCESSAMENTO DE IMAGENS", type: "DISCIPLINA", hours: "45h" },
    { code: "MAT061", name: "TOPICOS EM ENGENHARIA DE SOFTWARE", type: "DISCIPLINA", hours: "60h" },
    { code: "MATB25", name: "TÓPICOS EM ENGENHARIA DE SOFTWARE", type: "DISCIPLINA", hours: "45h" },
    { code: "MATB05", name: "TÓPICOS EM INTELIGÊNCIA ARTIFICIAL", type: "DISCIPLINA", hours: "45h" },
    { code: "MATA79", name: "TÓPICOS EM PROGRAMAÇÃO", type: "DISCIPLINA", hours: "45h" },
    { code: "MAT060", name: "TOPICOS EM REDES", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA86", name: "TÓPICOS EM REDES DE COMPUTADORES", type: "DISCIPLINA", hours: "45h" },
    { code: "MAT168", name: "TOPICOS EM SISTEMAS DE INFORMACAO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATD02", name: "TÓPICOS EM SISTEMAS DE INFORMAÇÃO", type: "DISCIPLINA", hours: "45h" },
    { code: "MATB26", name: "TÓPICOS EM SISTEMAS MULTIMÍDIA", type: "DISCIPLINA", hours: "45h" },
    { code: "MAT062", name: "TOPICOS EM SISTEMAS OPERACIONAIS", type: "DISCIPLINA", hours: "60h" },
    { code: "MATA83", name: "TÓPICOS EM SISTEMAS OPERACIONAIS", type: "DISCIPLINA", hours: "45h" },
    { code: "MAT169", name: "TOPICOS SISTEMAS DE COMPUTACAO", type: "DISCIPLINA", hours: "60h" },
    { code: "MATB15", name: "VALIDAÇÃO DE SOFTWARE", type: "DISCIPLINA", hours: "45h" }
];

// Função para carregar as matérias
function loadSubjects() {
    const subjectsList = document.getElementById('subjects-list');
    subjectsList.innerHTML = '';

    subjectsData.forEach(subject => {
        const subjectElement = document.createElement('div');
        subjectElement.className = 'subject-item';
        subjectElement.onclick = () => selectSubject(subject);

        subjectElement.innerHTML = `
            <div class="subject-details">
                <div class="subject-code">${subject.code}</div>
                <div class="subject-name">${subject.name}</div>
            </div>
            <div class="subject-info">
                <div class="subject-type">${subject.type}</div>
                <div class="subject-hours">${subject.hours}</div>
            </div>
        `;

        subjectsList.appendChild(subjectElement);
    });

    // Adicionar funcionalidade de busca
    const searchInput = document.getElementById('subject-search');
    searchInput.addEventListener('input', filterSubjects);
}

// Função para filtrar matérias
function filterSubjects() {
    const searchTerm = document.getElementById('subject-search').value.toLowerCase();
    const subjectItems = document.querySelectorAll('.subject-item');

    subjectItems.forEach(item => {
        const code = item.querySelector('.subject-code').textContent.toLowerCase();
        const name = item.querySelector('.subject-name').textContent.toLowerCase();

        if (code.includes(searchTerm) || name.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Função para selecionar uma matéria
function selectSubject(subject) {
    // Aqui você pode implementar a lógica para quando uma matéria for selecionada
    // Por exemplo, voltar para o formulário e preencher o campo de matéria
    alert(`Matéria selecionada: ${subject.code} - ${subject.name}`);

    // Voltar para o formulário e preencher o campo
    goToForm();
    const materiaInput = document.getElementById('materia');
    if (materiaInput) {
        materiaInput.value = `${subject.code} - ${subject.name}`;
    }
}

// Lista de professores do departamento de Ciência da Computação
const professorsData = [
    { name: "Alírio Santos de Sá", title: "Professor Associado", department: "DCI", degree: "Doutor", university: "UFBA" },
    { name: "Antonio Lopes Apolinario Junior", title: "Professor Associado", department: "DCC", degree: "Doutor", university: "UFRJ" },
    { name: "Bruno Pereira dos Santos", title: "Professor Adjunto", department: "DCC", degree: "Doutor", university: "UFMG" },
    { name: "Cássio Vinicius Serafim Prazeres", title: "Professor Associado", department: "DCC", degree: "Doutor", university: "ICMC/USP" },
    { name: "Christina von Flach Garcia Chavez", title: "Professora Associada", department: "DCC", degree: "Doutora", university: "PUC-Rio" },
    { name: "Cláudio Nogueira Sant'Anna", title: "Professor Associado", department: "DCC", degree: "Doutor", university: "PUC-Rio" },
    { name: "Daniela Barreiro Claro", title: "Professora Titular", department: "DCC", degree: "Doutora", university: "Université d'Angers" },
    { name: "Danilo Barbosa Coimbra", title: "Professor Adjunto", department: "DCC", degree: "Doutor", university: "ICMC/USP" },
    { name: "Débora Abdalla Santos", title: "Professora Titular", department: "DCI", degree: "Doutora", university: "UFPE" },
    { name: "Eduardo Santana de Almeida", title: "Professor Titular", department: "DCC", degree: "Doutor", university: "UFPE" },
    { name: "Flávio Morais de Assis Silva", title: "Professor Titular", department: "DCI", degree: "Doutor", university: "Universidade Técnica de Berlim" },
    { name: "Frederico Araújo Durão", title: "Professor Associado", department: "DCC", degree: "Doutor", university: "Universidade de Aalborg" },
    { name: "George Marconi de Araújo Lima", title: "Professor Titular", department: "DCC", degree: "Doutor", university: "Universidade de York" },
    { name: "Gustavo Bittencourt Figueiredo", title: "Professor Associado", department: "DCC", degree: "Doutor", university: "UNICAMP" },
    { name: "Islame Felipe da Costa Fernandes", title: "Professor Adjunto", department: "DCC", degree: "Doutor", university: "UFRN" },
    { name: "Ivan do Carmo Machado", title: "Professor Adjunto", department: "DCC", degree: "Doutor", university: "UFBA" },
    { name: "Karl Apaza Agüero", title: "Professor Adjunto", department: "DCC", degree: "Doutor", university: "UFPR" },
    { name: "Laís do Nascimento Salvador", title: "Professora Associada", department: "DCI", degree: "Doutora", university: "Poli/USP" },
    { name: "Leobino Nascimento Sampaio", title: "Professor Associado", department: "DCC", degree: "Doutor", university: "Cin/UFPE" },
    { name: "Luciano Rebouças de Oliveira", title: "Professor Associado", department: "DCC", degree: "PhD", university: "Universidade de Coimbra" },
    { name: "Luma da Rocha Seixas", title: "Professora Adjunta", department: "DCI", degree: "Doutora", university: "UFPE" },
    { name: "Manoel Gomes de Mendonça Neto", title: "Professor Associado", department: "DCC", degree: "Doutor", university: "Universidade de Maryland" },
    { name: "Marlo Vieira dos Santos e Souza", title: "Professor Adjunto", department: "DCI", degree: "Doutor", university: "UFRGS" },
    { name: "Maycon Leone Maciel Peixoto", title: "Professor Associado", department: "DCC", degree: "Doutor", university: "ICMC/USP" },
    { name: "Paul Denis Etienne Regnier", title: "Professor Adjunto", department: "DCI", degree: "Doutor", university: "UFBA" },
    { name: "Raimundo José de Araújo Macêdo", title: "Professor Titular", department: "DCI", degree: "Doutor", university: "Universidade de Newcastle" },
    { name: "Rafael Augusto de Melo", title: "Professor Adjunto", department: "DCC", degree: "Doutor", university: "CORE/Université Catholique de Louvain" },
    { name: "Ricardo Araújo Rios", title: "Professor Adjunto", department: "DCC", degree: "Doutor", university: "USP" },
    { name: "Rita Suzana Pitangueira Maciel", title: "Professora Associada", department: "DCC", degree: "Doutora", university: "UFPE" },
    { name: "Roberto Freitas Parente", title: "Professor Adjunto", department: "DCI", degree: "Doutor", university: "USP" },
    { name: "Robespierre Dantas da Rocha Pita", title: "Professor Adjunto", department: "DCC", degree: "Doutor", university: "UFBA" },
    { name: "Rodrigo Rocha Gomes e Souza", title: "Professor Adjunto", department: "DCC", degree: "Doutor", university: "UFBA" },
    { name: "Rubisley de Paula Lemes", title: "Professor Adjunto", department: "DCC", degree: "Doutor", university: "UFPR" },
    { name: "Sérgio Gorender", title: "Professor Titular", department: "DCI", degree: "Doutor", university: "UFPE" },
    { name: "Steffen Lewitzka", title: "Professor Associado", department: "DCC", degree: "Doutor", university: "UFPE" },
    { name: "Tatiane Nogueira Rios", title: "Professora Adjunta", department: "DCC", degree: "Doutora", university: "USP" },
    { name: "Vaninha Vieira dos Santos", title: "Professora Associada", department: "DCC", degree: "Doutora", university: "UFPE" }
];

// Função para carregar os professores
function loadProfessors() {
    const professorsList = document.getElementById('professors-list');
    professorsList.innerHTML = '';

    professorsData.forEach(professor => {
        const professorElement = document.createElement('div');
        professorElement.className = 'professor-item';
        professorElement.onclick = () => selectProfessor(professor);

        professorElement.innerHTML = `
            <div class="professor-details">
                <div class="professor-name">${professor.name}</div>
                <div class="professor-title">${professor.title}</div>
                <div class="professor-department">${professor.department}</div>
            </div>
            <div class="professor-info">
                <div class="professor-degree">${professor.degree}</div>
                <div class="professor-university">${professor.university}</div>
            </div>
        `;

        professorsList.appendChild(professorElement);
    });

    // Adicionar funcionalidade de busca
    const searchInput = document.getElementById('professor-search');
    searchInput.addEventListener('input', filterProfessors);
}

// Função para filtrar professores
function filterProfessors() {
    const searchTerm = document.getElementById('professor-search').value.toLowerCase();
    const professorItems = document.querySelectorAll('.professor-item');

    professorItems.forEach(item => {
        const name = item.querySelector('.professor-name').textContent.toLowerCase();

        if (name.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Função para selecionar um professor
function selectProfessor(professor) {
    // Aqui você pode implementar a lógica para quando um professor for selecionado
    // Por exemplo, voltar para o formulário e preencher o campo de professor
    alert(`Professor selecionado: ${professor.name}`);

    // Voltar para o formulário e preencher o campo
    goToForm();
    const professorInput = document.getElementById('professor');
    if (professorInput) {
        professorInput.value = professor.name;
    }
}

// Lista de cursos do departamento de Ciência da Computação
const coursesData = [
    { name: "Ciência da Computação", description: "Curso de graduação em Ciência da Computação", type: "Bacharelado", duration: "8 semestres" },
    { name: "Sistemas de Informação", description: "Curso de graduação em Sistemas de Informação", type: "Bacharelado", duration: "8 semestres" },
    { name: "Licenciatura em Computação", description: "Curso de formação de professores em Computação", type: "Licenciatura", duration: "8 semestres" }
];

// Função para carregar os cursos
function loadCourses() {
    const coursesList = document.getElementById('courses-list');
    coursesList.innerHTML = '';

    coursesData.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = 'course-item';
        courseElement.onclick = () => selectCourse(course);

        courseElement.innerHTML = `
            <div class="course-details">
                <div class="course-name">${course.name}</div>
                <div class="course-description">${course.description}</div>
                <div class="course-department">DCC - Departamento de Ciência da Computação</div>
            </div>
            <div class="course-info">
                <div class="course-type">${course.type}</div>
                <div class="course-duration">${course.duration}</div>
            </div>
        `;

        coursesList.appendChild(courseElement);
    });

    // Adicionar funcionalidade de busca
    const searchInput = document.getElementById('course-search');
    searchInput.addEventListener('input', filterCourses);
}

// Função para filtrar cursos
function filterCourses() {
    const searchTerm = document.getElementById('course-search').value.toLowerCase();
    const courseItems = document.querySelectorAll('.course-item');

    courseItems.forEach(item => {
        const name = item.querySelector('.course-name').textContent.toLowerCase();
        const description = item.querySelector('.course-description').textContent.toLowerCase();

        if (name.includes(searchTerm) || description.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Função para selecionar um curso
function selectCourse(course) {
    // Aqui você pode implementar a lógica para quando um curso for selecionado
    // Por exemplo, mostrar materiais relacionados ao curso ou voltar para home
    alert(`Curso selecionado: ${course.name}`);

    // Por enquanto, volta para a tela inicial
    goToHome();
}

// Navegação para tela de perfil
function goToProfile() {
    showScreen('profile-screen');
}

// Função para logout
function logout() {
    // Simulação de logout
    alert('Logout realizado com sucesso!');
    showScreen('login-screen');
}

// Função para mostrar aviso de download
function showDownloadAlert() {
    const alert = document.createElement('div');
    alert.className = 'note-highlight';
    alert.textContent = 'Download iniciado! 📁';
    alert.style.background = '#e8f5e8';
    alert.style.color = '#2e7d32';
    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Função para mostrar aviso de compartilhamento
function showShareAlert() {
    const alert = document.createElement('div');
    alert.className = 'note-highlight';
    alert.textContent = 'Link copiado para a área de transferência! 🔗';
    alert.style.background = '#e8f4fd';
    alert.style.color = '#63c5e5';
    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Adicionar event listeners aos botões de download e compartilhar
document.addEventListener('DOMContentLoaded', function() {
    // Botões de download
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            showDownloadAlert();

            // Feedback visual
            const original = this.innerHTML;
            this.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M 5 13 L 10 18 L 19 7" fill="none" stroke="#63c5e5" stroke-width="3"/>
                </svg>
            `;

            setTimeout(() => {
                this.innerHTML = original;
            }, 1500);
        });
    });

    // Botões de compartilhar
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            showShareAlert();

            // Feedback visual
            const original = this.textContent;
            this.textContent = '✓';
            this.style.color = '#63c5e5';

            setTimeout(() => {
                this.textContent = original;
                this.style.color = '';
            }, 1500);
        });
    });

    // Botões de perfil na navegação
    const profileNavButtons = document.querySelectorAll('.nav-btn');
    profileNavButtons.forEach(btn => {
        if (btn.querySelector('span') && btn.querySelector('span').textContent === 'Perfil') {
            btn.addEventListener('click', goToProfile);
        }
    });
});

// Mensagem inicial no console
console.log('%c🎓 UFBArchive Protótipo', 'color: #63c5e5; font-size: 20px; font-weight: bold;');
console.log('%cProtótipo de alta fidelidade - Engenharia de Software 2', 'color: #666; font-size: 12px;');
console.log('%cDica: Pressione ESC para voltar entre telas', 'color: #999; font-size: 10px;');
