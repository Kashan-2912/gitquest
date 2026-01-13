import { SelectCreature } from '@/db/schema'
import CreatureCard from './creature-card';
import { Button } from './ui/button';

type LatestCreaturesProps = {
  creatures: SelectCreature[];
}

const LatestCreatures = ({ creatures } : LatestCreaturesProps) => {
  return (
    <div className='flex flex-col gap-5 px-5'>
        <h2>Latest Creatures</h2>
        <div className='flex flex-wrap gap-4'>
            {creatures.map((creature : SelectCreature) => (
                // <CreatureCard key={creature.id} creature={creature} />

                <Button key={creature.id} variant="default">
                    {creature.githubProfileUrl.split("/").pop()}
                </Button>
            ))}
        </div>
    </div>
  )
}

export default LatestCreatures