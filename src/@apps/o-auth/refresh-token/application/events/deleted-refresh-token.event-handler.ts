import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedRefreshTokenEvent } from './deleted-refresh-token.event';

@EventsHandler(DeletedRefreshTokenEvent)
export class DeletedRefreshTokenEventHandler implements IEventHandler<DeletedRefreshTokenEvent>
{
    handle(event: DeletedRefreshTokenEvent): void
    {
        // console.log('DeletedRefreshTokenEvent: ', event);
    }
}