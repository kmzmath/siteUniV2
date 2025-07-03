import { Text } from "@/ui/atoms";
import { Dialog } from "@/ui/molecules";

type RatingDisclaimerModalProps = {
  closeModal: () => void;
};

const RatingDisclaimerModal: React.FC<RatingDisclaimerModalProps> = ({
  closeModal,
}) => (
  <Dialog
    title="Como é calculada a nota?"
    closeDialog={closeModal}
    className="w-[900px]"
  >
    <div className="flex flex-col gap-2">
      <Text variant="bodyMedium">
        A nota de cada time é calculada automaticamente por um algoritmo, que
        usa os seguintes pesos e parâmetros:
      </Text>

      <div className="flex flex-col gap-1">
        <Text variant="bodyLarge" bold>
          1. Métricas brutas de desempenho (55%)
        </Text>

        <Text>
          <b>a. r_colley (Rating Colley):</b>
          <br /> Resolve um sistema linear a partir das vitórias/derrotas
          ponderadas pelo tempo.
        </Text>

        <Text>
          <b>b. r_massey (Rating Massey):</b>
          <br /> Semelhante ao Colley, mas usa margem de vitória (rounds) como
          sinal de força.
        </Text>

        <Text>
          <b>c. r_elo_final (Elo “final”):</b>
          <br /> Elo tradicional recalculado da 1ª à última partida, já decaindo
          resultados antigos.
        </Text>

        <Text>
          <b>d. r_elo_mov (Elo “movimento”):</b>
          <br /> Mesmo Elo, mas considera só as variações (quanto o time variou
          na temporada).
        </Text>

        <Text>
          <b>e. ts_score (TrueSkill):</b>
          <br /> Modelo bayesiano que atualiza média e variância de habilidade
          jogo a jogo.
        </Text>

        <Text>
          <b>f. r_pagerank (PageRank vitórias):</b>
          <br /> Enxerga o campeonato como um grafo: ganhar de quem ganha de
          muitos vale mais.
        </Text>

        <Text>
          <b>g. r_bt_pois (Bradley‑Terry‑Poisson):</b>
          <br /> Modelo probabilístico de rounds que valoriza quem faz muitos
          rounds e leva poucos.
        </Text>
      </div>

      <Text>
        Após o cálculo cada métrica é padronizada para escalas comparáveis,
        através da normalização ou escalonamento.
        <br />
      </Text>

      <Text variant="bodyLarge" bold>
        2. Força de tabela - sos_score (17%)
      </Text>

      <Text>
        Mede quão difíceis foram os adversários de cada equipe. Vitórias contra
        adversários mais difíceis valem mais do que vitórias contra adversários
        com menos força, o mesmo acontece para derrotas, perder para adversários
        mais fortes é tratado como &quot;esperado&quot;, e não punem tanto as
        equipes quanto perder para um adversário mais fraco.
      </Text>

      <Text variant="bodyLarge" bold>
        3. Consistência – consistency (5%)
      </Text>

      <Text>
        Calcula o desvio‑padrão partida‑a‑partida, valorizando equipes com menor
        variância. Tenta recompensar equipes que &quot;seguem a lógica&quot;:
        Ganham as partidas que são esperados de vencer, e principalmente, não
        perdem jogos que são favoritos.
      </Text>

      <Text variant="bodyLarge" bold>
        4. Padrão global – pca_score (23%)
      </Text>

      <Text>
        Executa PCA sobre os 7 scores; o 1º componente captura o padrão
        predominante de força. Usa a decomposição espectral da matriz de
        covariância para encontrar os autovalores e autovetores. Os autovetores
        da matriz de covariância são as direções principais dos dados, enquanto
        os autovalores representam a magnitude da variação nessas direções.
        Resumidamente, tenta encontrar padrões em times fortes, valorizando
        equipes que são boas em vários aspectos de medida, e não somente em um
        ou outro.
      </Text>

      <Text>
        Além disso, todas as partidas são ponderadas com o tempo, ou seja,
        partidas que aconteceram a mais tempo tem impacto menor na nota do que
        as partidas mais recentes. O tempo de meia vida (Tempo para a partida
        valer apenas metade de uma partida recente) é de 180 dias.
      </Text>
    </div>
  </Dialog>
);

export default RatingDisclaimerModal;
