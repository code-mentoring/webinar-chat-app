import { Router } from 'express';
import { Conversation } from '../models/Conversation';
import { middlewareConvo } from '../middleware/authConversation';

export const conversationsRouter = Router();

// CRUD of the Conversation in REST API

// Get list of conversations
conversationsRouter.get('/', async (_req, res) => {
  // Fetch ALL the conversations
  const conversations = await Conversation.findAll();
  // Send them in the pipe
  res.json(conversations);
});

// Get ONE conversation
conversationsRouter.get('/:conversationID', middlewareConvo, async (req, res) => {
  const { conversationID } = req.params;
  const conversation = await Conversation.findByPk(conversationID);
  res.json(conversation);
});

// Create a conversation
conversationsRouter.post('/', async (req, res, next) => {
  try {
    const conversation = new Conversation(req.body); // NOTE: THIS IS DANGEROUS
    await conversation.save();
    await conversation.$add('user', res.locals.user.id);
    res.json(conversation);
  } catch (e) {
    next(e);
  }
});

// Update a conversation
conversationsRouter.patch('/:conversationID', middlewareConvo, async (req, res, next) => {
  try {
    await Conversation.update(req.body, {
      where: { id: req.params.conversationID },
      returning: true // TODO: Fix this
    });
    const conversation = await Conversation.findByPk(req.params.conversationID);
    res.json(conversation);
  } catch (e) {
    next(e);
  }
});

// Update a conversation
conversationsRouter.delete('/:conversationID', middlewareConvo, async (req, res, next) => {
  try {
    Conversation.destroy({
      where: { id: req.params.conversationID }
    });
    res.json({
      message: 'Successfully deleted conversation'
    });
  } catch (e) {
    next(e);
  }
});


conversationsRouter.get('/:conversationID/messages', middlewareConvo, async (req, res, next) => {
  // Get the conversation
  const { conversationID } = req.params;
  const conversation = await Conversation.findByPk(conversationID);
  if (!conversation) return next(new Error('No conversation with that id'));
  // Get the messages in the one to many relationship
  const messages = await conversation.$get('messages');
  // Return the messages
  res.json(messages);
});

conversationsRouter.post('/:conversationID/add-user', middlewareConvo, async (req, res, next) => {
  // Get the conversation
  const { conversationID } = req.params;
  const { userId } = req.body;

  const conversation = await Conversation.findByPk(conversationID);
  if (!conversation) return next(new Error('No conversation with that id'));

  await conversation.$add('user', userId);
  // Return the messages
  res.json({
    data: true
  });
});
