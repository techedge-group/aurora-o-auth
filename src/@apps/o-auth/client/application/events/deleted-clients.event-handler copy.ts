import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedClientsEvent } from './deleted-clients.event';

@EventsHandler(DeletedClientsEvent)
export class DeletedClientsEventHandler implements IEventHandler<DeletedClientsEvent>
{
    handle(event: DeletedClientsEvent): void
    {
        // console.log('DeletedClientsEvent: ', event);
    }
}