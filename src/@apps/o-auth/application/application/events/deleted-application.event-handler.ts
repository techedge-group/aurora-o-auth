import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedApplicationEvent } from './deleted-application.event';

@EventsHandler(DeletedApplicationEvent)
export class DeletedApplicationEventHandler implements IEventHandler<DeletedApplicationEvent>
{
    handle(event: DeletedApplicationEvent): void
    {
        // console.log('DeletedApplicationEvent: ', event);
    }
}