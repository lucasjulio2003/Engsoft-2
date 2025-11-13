# UFBArchive - Protótipo de Alta Fidelidade

Protótipo interativo de alta fidelidade para a plataforma **UFBArchive**, um sistema de compartilhamento de avaliações antigas de professores da UFBA.

## 📱 Fluxo de Telas

O protótipo simula o seguinte fluxo de usuário:

1. **Tela de Login**
   - Login com email UFBA e senha
   - Link para recuperação de senha
   - Link de ajuda

2. **Tela Home**
   - Tabs: Matérias, Cursos, Professores
   - Barra de pesquisa
   - Lista de materiais populares (Provas, Anotações, Trabalhos)
   - Cards com informações: título, matéria, professor, semestre
   - Ações: download, like, compartilhar
   - Navegação inferior: Home, Contribua, Perfil

3. **Tela de Perfil**
   - Foto de perfil com botão de edição
   - Nome de usuário e email
   - Estatísticas: Downloads, Curtidos, Contribuições
   - Seções: Meus Downloads, Curtidos, Minhas Contribuições
   - Botão de logout

4. **Tela de Busca Vazia**
   - Exibida quando não há resultados
   - Incentivo para contribuir com materiais
   - Botão para acessar formulário de envio

5. **Formulário de Envio**
   - Campos: Matéria, Professor, Semestre, Tipo de Prova
   - Checkboxes: Resolvido, Gabarito
   - Botão para anexar arquivos
   - Ações: Cancelar, Enviar

6. **Seleção de Arquivos**
   - Upload de Prova
   - Upload de Gabarito
   - Ações: Cancelar, Anexar

7. **Confirmação de Upload**
   - Mensagem de sucesso
   - Contador de materiais enviados
   - Retorno automático para Home (3 segundos)

## 🎨 Características do Design

- **Cores principais**: 
  - Verde água (#63c5e5) - cor primária
  - Tons de cinza para texto e UI
  - Tags coloridas por tipo de material

- **Design Mobile-First**: Interface otimizada para dispositivos móveis (375x812px)

- **Interatividade**:
  - Transições suaves entre telas
  - Feedback visual em botões
  - Animações sutis
  - Estados hover e active

- **Componentes**:
  - Cards de materiais
  - Formulários com validação visual
  - Upload de arquivos com feedback
  - Navegação por abas
  - Bottom navigation

## 🚀 Como Usar

1. Abra o arquivo `index.html` em um navegador moderno
2. O protótipo inicia na tela de login
3. Clique no botão "Login" para avançar
4. Navegue pelas telas usando os botões e menus
5. Pressione `ESC` para voltar entre telas

## ⌨️ Atalhos

- **ESC**: Voltar para tela anterior
- **Duplo clique no logo**: Retornar ao login

## 🔧 Tecnologias

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (Vanilla)
- SVG para ícones

## 📝 Notas

Este é um **protótipo não funcional**. Todas as interações são simuladas:
- Não há backend ou API
- Não há autenticação real
- Não há upload real de arquivos
- Dados são estáticos e exemplificativos

## 🎯 Objetivos do Protótipo

- Demonstrar fluxo completo de usuário
- Validar design e usabilidade
- Servir como base para desenvolvimento
- Facilitar feedback de stakeholders

---

**Disciplina**: Engenharia de Software 2  
**Instituição**: UFBA  
**Ano**: 2025
