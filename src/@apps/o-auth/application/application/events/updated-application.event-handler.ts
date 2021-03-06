import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedApplicationEvent } from './updated-application.event';

@EventsHandler(UpdatedApplicationEvent)
export class UpdatedApplicationEventHandler implements IEventHandler<UpdatedApplicationEvent>
{
    handle(event: UpdatedApplicationEvent): void
    {
        // console.log('UpdatedApplicationEvent: ', event);
    }
}