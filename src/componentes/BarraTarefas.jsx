import {
  FaChevronUp,
  FaChrome,
  FaCode,
  FaDiscord,
  FaFolderOpen,
  FaMicrophone,
  FaSpotify,
  FaVolumeUp,
  FaWifi,
  FaWindows,
} from "react-icons/fa";

function BarraTarefas({ horario, dataDesktop }) {
  return (
    <nav className="barra-tarefas" aria-label="Barra de tarefas">
      <div className="aplicativos-tarefa">
        <button
          className="icone-tarefa windows"
          type="button"
          aria-label="Iniciar"
        >
          <FaWindows />
        </button>

        <button
          className="icone-tarefa chrome"
          type="button"
          aria-label="Google Chrome"
        >
          <FaChrome />
        </button>

        <button
          className="icone-tarefa explorador-icone"
          type="button"
          aria-label="Explorador de Arquivos"
        >
          <FaFolderOpen />
        </button>

        <button
          className="icone-tarefa spotify"
          type="button"
          aria-label="Spotify"
        >
          <FaSpotify />
        </button>

        <button
          className="icone-tarefa discord"
          type="button"
          aria-label="Discord"
        >
          <FaDiscord />
          <span className="notificacao-discord">1</span>
        </button>

        <button
          className="icone-tarefa vscode"
          type="button"
          aria-label="Visual Studio Code"
        >
          <FaCode />
        </button>
      </div>

      <div className="area-sistema">
        <FaChevronUp />
        <FaMicrophone />
        <FaWifi />
        <FaVolumeUp />

        <div className="relogio-desktop">
          <span>{horario}</span>
          <span>{dataDesktop}</span>
        </div>
      </div>
    </nav>
  );
}

export default BarraTarefas;