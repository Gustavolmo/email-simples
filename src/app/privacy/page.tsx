export default function Privacy() {
  return (
    <div className="p-20 max-w-[900px] mx-auto">
      <header className="mb-10 flex gap-4 underline">
        <a href="/">Email Simples</a>
        <a href="/terms">Termos e Condições</a>
      </header>

      <h1 className="text-4xl">Política de Privacidade</h1>
      <p>Última atualização: 25 de agosto de 2024</p>

      <div className="mt-10">
        <h2>1. Introdução</h2>
        <p>
          Esta Política de Privacidade aplica-se ao aplicativo de automação de
          e-mail (o &quot;Aplicativo&quot;) fornecido como cortesia à Embaixada
          do Brasil na Suécia. O Aplicativo foi projetado para automatizar o
          envio de e-mails para grandes grupos de convidados.
        </p>
      </div>

      <div className="mt-10">
        <h2>2. Coleta e Uso de Dados</h2>
        <p>
          Nosso Aplicativo não armazena nenhum dado pessoal. Utilizamos
          temporariamente endereços de e-mail e nomes durante a sessão do
          aplicativo, usando dados fornecidos pela autenticação do Google. Essas
          informações são usadas exclusivamente para o envio de e-mails e não
          são retidas após o término da sessão.
        </p>
      </div>
      <div className="mt-10">
        <h2>3. Serviços de Terceiros</h2>
        <p>
          Nosso Aplicativo utiliza a API do Gmail e o OAuth2 do Gmail para fins
          de autenticação e envio de e-mails. Os usuários devem consultar a
          Política de Privacidade do Google para obter informações sobre como o
          Google trata seus dados.
        </p>
      </div>
      <div className="mt-10">
        <h2>4. Armazenamento de Dados</h2>
        <p>
          Não armazenamos nenhum dado do usuário. Todas as informações são
          processadas em tempo real e não são retidas após a conclusão da sessão
          de envio de e-mails.
        </p>
      </div>
      <div className="mt-10">
        <h2>5. Direitos do Usuário</h2>
        <p>
          Como não armazenamos dados do usuário, não há direitos específicos do
          usuário em relação à exclusão ou modificação de dados. Os usuários
          podem gerenciar os dados de sua conta Google diretamente através dos
          serviços do Google.
        </p>
      </div>
      <div className="mt-10">
        <h2>6. Conformidade com o GDPR</h2>
        <p>
          Nosso Aplicativo foi projetado com a privacidade em mente. Não
          rastreamos usuários nem armazenamos dados pessoais, o que está
          alinhado com os princípios do GDPR. Como não retemos dados pessoais,
          muitos requisitos do GDPR (como o direito ao esquecimento) não se
          aplicam ao nosso serviço.
        </p>
      </div>
      <div className="mt-10">
        <h2>7. Alterações nesta Política</h2>
        <p>
          Podemos atualizar esta Política de Privacidade periodicamente. Os
          usuários são aconselhados a revisar esta página periodicamente para
          quaisquer alterações. As alterações entram em vigor imediatamente após
          serem publicadas nesta página.
        </p>
      </div>
      <div className="mt-10">
        <h2>8. Contate-nos</h2>
        <p>
          Se você tiver alguma dúvida sobre esta Política de Privacidade, entre
          em contato conosco em: lmo.gustavo@gmail.com
        </p>
      </div>
    </div>
  );
}
