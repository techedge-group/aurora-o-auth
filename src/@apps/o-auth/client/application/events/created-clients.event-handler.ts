import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedClientsEvent } from './created-clients.event';

@EventsHandler(CreatedClientsEvent)
export class CreatedClientsEventHandler implements IEventHandler<CreatedClientsEvent>
{
    handle(event: CreatedClientsEvent): void
    {
        // console.log('CreatedClientsEvent: ', event);
    }
}