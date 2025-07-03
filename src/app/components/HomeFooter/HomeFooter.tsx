import { Text, VisitCounter } from "@/ui/atoms";

const HomeFooter: React.FC = () => (
  <footer className="flex flex-col items-center justify-center py-8 gap-4">
    <div className="flex flex-col items-center justify-center">
      <Text variant="bodySmall" className="text-slate-400">
        calculations, api, and data collection by kmyzth
      </Text>

      <Text variant="bodySmall" className="text-slate-400">
        website by kick
      </Text>

      <Text variant="bodySmall" className="text-slate-400">
        matches by bagres universitários
      </Text>

      <Text variant="bodySmall" className="text-slate-400">
        (:
      </Text>
    </div>

    <VisitCounter />
  </footer>
);

export default HomeFooter;