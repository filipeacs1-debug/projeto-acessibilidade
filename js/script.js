document.addEventListener("DOMContentLoaded", () => {

    /*
     * MENU
     */

    const menuButton = document.getElementById("menuButton");
    const mainMenu = document.getElementById("mainMenu");

    if (menuButton && mainMenu) {

        menuButton.addEventListener("click", () => {

            const isOpen =
                menuButton.getAttribute("aria-expanded") === "true";

            menuButton.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            mainMenu.classList.toggle(
                "is-open",
                !isOpen
            );

            const text =
                menuButton.querySelector(".sr-only");

            if (text) {
                text.textContent =
                    isOpen
                        ? "Abrir menu"
                        : "Fechar menu";
            }

        });

    }


    /*
     * BUSCA DE CURSOS
     */

    const searchForm =
        document.getElementById("searchForm");

    const results =
        document.getElementById("results");

    const searchStatus =
        document.getElementById("searchStatus");


    const courses = [

        {
            name: "Administração",
            modality: "Presencial",
            city: "Belém",
            type: "Bacharelado"
        },

        {
            name: "Administração",
            modality: "EAD",
            city: "Manaus",
            type: "Bacharelado"
        },

        {
            name: "Enfermagem",
            modality: "Presencial",
            city: "Belém",
            type: "Bacharelado"
        },

        {
            name: "Pedagogia",
            modality: "EAD",
            city: "Boa Vista",
            type: "Licenciatura"
        },

        {
            name: "Sistemas de Informação",
            modality: "Presencial",
            city: "Belém",
            type: "Bacharelado"
        }

    ];


    function renderCourses(list) {

        if (!results) {
            return;
        }


        results.innerHTML = "";


        if (list.length === 0) {

            results.innerHTML = `
                <div class="result-card">
                    <h2>Nenhum curso encontrado</h2>

                    <p>
                        Não encontramos cursos para os filtros selecionados.
                    </p>

                    <p>
                        Tente alterar a cidade, modalidade ou nome do curso.
                    </p>
                </div>
            `;

            return;
        }


        list.forEach(course => {

            const card =
                document.createElement("article");

            card.className =
                "result-card";


            card.innerHTML = `
                <h2>${course.name}</h2>

                <div class="result-meta">

                    <span class="badge">
                        ${course.type}
                    </span>

                    <span class="badge">
                        ${course.modality}
                    </span>

                    <span class="badge">
                        ${course.city}
                    </span>

                </div>

                <p>
                    Curso de ${course.name},
                    modalidade ${course.modality},
                    em ${course.city}.
                </p>

                <a
                    href="curso.html"
                    class="button button-primary"
                >
                    Ver detalhes
                </a>
            `;


            results.appendChild(card);

        });

    }


    if (searchForm) {

        searchForm.addEventListener("submit", event => {

            event.preventDefault();


            const courseInput =
                document.getElementById("curso");

            const cityInput =
                document.getElementById("cidade");

            const modalityInput =
                document.getElementById("modalidade");


            const search =
                courseInput.value
                    .trim()
                    .toLowerCase();


            const city =
                cityInput.value;


            const modality =
                modalityInput.value;


            const filtered =
                courses.filter(course => {

                    const matchesName =
                        !search ||
                        course.name
                            .toLowerCase()
                            .includes(search);


                    const matchesCity =
                        !city ||
                        course.city === city;


                    const matchesModality =
                        !modality ||
                        course.modality === modality;


                    return (
                        matchesName &&
                        matchesCity &&
                        matchesModality
                    );

                });


            if (searchStatus) {

                searchStatus.textContent =
                    `${filtered.length} curso(s) encontrado(s).`;

            }


            renderCourses(filtered);

        });

    }


    /*
     * LOGIN
     */

    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        loginForm.addEventListener("submit", event => {

            event.preventDefault();


            const cpf =
                document.getElementById("cpf");

            const senha =
                document.getElementById("senha");

            const cpfError =
                document.getElementById("cpfError");

            const senhaError =
                document.getElementById("senhaError");

            const message =
                document.getElementById("loginMessage");


            cpfError.textContent = "";
            senhaError.textContent = "";
            message.textContent = "";


            let valid = true;


            if (!cpf.value.trim()) {

                cpfError.textContent =
                    "Informe seu CPF.";

                valid = false;

            }


            if (!senha.value.trim()) {

                senhaError.textContent =
                    "Informe sua senha.";

                valid = false;

            }


            if (!valid) {
                return;
            }


            message.textContent =
                "Login realizado com sucesso. Este é um protótipo acadêmico.";

        });

    }


    /*
     * INSCRIÇÃO
     */

    const enrollmentForm =
        document.getElementById("enrollmentForm");


    if (enrollmentForm) {

        enrollmentForm.addEventListener("submit", event => {

            event.preventDefault();


            const fields = [
                {
                    input: "nome",
                    error: "nomeError",
                    message: "Informe seu nome completo."
                },
                {
                    input: "email",
                    error: "emailError",
                    message: "Informe um e-mail válido."
                },
                {
                    input: "telefone",
                    error: "telefoneError",
                    message: "Informe seu telefone."
                }
            ];


            let valid = true;


            fields.forEach(field => {

                const input =
                    document.getElementById(field.input);

                const error =
                    document.getElementById(field.error);


                error.textContent = "";


                if (!input.value.trim()) {

                    error.textContent =
                        field.message;

                    valid = false;

                }

            });


            if (!valid) {

                const firstError =
                    document.querySelector(
                        ".field-error:not(:empty)"
                    );

                if (firstError) {

                    const input =
                        firstError
                            .previousElementSibling;

                    if (input) {
                        input.focus();
                    }

                }

                return;
            }


            window.location.href =
                "sucesso.html";

        });

    }


    /*
     * TESTE VOCACIONAL
     */

    const vocationalForm =
        document.getElementById("vocationalForm");


    if (vocationalForm) {

        vocationalForm.addEventListener("submit", event => {

            event.preventDefault();


            const selected =
                document.querySelector(
                    'input[name="question1"]:checked'
                );


            const result =
                document.getElementById(
                    "vocationalResult"
                );


            const resultText =
                document.getElementById(
                    "resultText"
                );


            if (!selected) {

                result.hidden = false;

                resultText.textContent =
                    "Selecione uma alternativa antes de continuar.";

                result.focus();

                return;
            }


            const messages = {

                humanas:
                    "Seu perfil demonstra interesse por pessoas, comunicação e sociedade. Cursos das áreas de Humanas podem ser interessantes para você.",

                exatas:
                    "Seu perfil demonstra interesse por lógica, tecnologia e resolução de problemas. Cursos das áreas de Exatas e Tecnologia podem ser interessantes para você.",

                saude:
                    "Seu perfil demonstra interesse por cuidado e bem-estar. Cursos da área de Saúde podem ser interessantes para você."

            };


            result.hidden = false;

            resultText.textContent =
                messages[selected.value];

            result.focus();

        });

    }

});
