package com.alert.controller;

import com.alert.dto.MessageDto;
import com.alert.service.EmitService;
import com.alert.service.KafkaProducerService;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Sinks;
import reactor.core.publisher.Sinks.Many;

@RestController
@RequiredArgsConstructor
public class AlertController {

  // logger 정의
  private static final Logger logger = LoggerFactory.getLogger(AlertController.class);

  // service 정의
  private final KafkaProducerService kafkaProducerService;
  private final EmitService emitService;

  // Sink 관리 자료구조 정의
  private final Map<String, Many<String>> userSinks = new ConcurrentHashMap<>();

  // 카프카에게 메시지 전송 (테스트 컨트롤러)
  @GetMapping("/send/kafka")
  public void sendKafka(String username) {
    logger.info("alert 토픽에게 {} 전송", username);
    kafkaProducerService.sendMessage("alert", username);
  }

  // 파이프라인 연결 (단순 String)
//  @GetMapping(value = "/sse/{userSeq}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
//  public Flux<String> sseSubscription(@PathVariable String userSeq){
//    Sinks.Many<String> userSink = userSinks.computeIfAbsent(userSeq, key -> Sinks.many().multicast().onBackpressureBuffer());
//    logger.info("파이프라인 시작");
//    return userSink.asFlux();
//  }

  // 파이프라인 연결 (ResponseEntity)
  @GetMapping(value = "/sse/{userSeq}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public Mono<ResponseEntity<Flux<String>>> sseSubscription(@PathVariable String userSeq){
    Sinks.Many<String> userSink = userSinks.computeIfAbsent(userSeq, key -> Sinks.many().multicast().onBackpressureBuffer());
    logger.info("파이프라인 시작");
    return Mono.just(ResponseEntity.ok().contentType(MediaType.TEXT_EVENT_STREAM).body(userSink.asFlux()));
  }

//  @KafkaListener(topics = "${kafka.topic}", groupId = "${kafka.group-id}")
//  public void consume(String message) {
//    logger.info("알림 컨슘 !!!!");
//    logger.info("받은 데이터 {}", message);
//    emitService.emitMessageToUser(userSinks,  message);
//  }

  @KafkaListener(topics = "${kafka.topic}", groupId = "${kafka.group-id}")
  public void consume(@Payload MessageDto messageDto) {
    logger.info("알림 컨슘 !!!!");
    logger.info("받은 데이터 {}", messageDto);
    logger.info("유저 식별번호 {}", messageDto.getUserSeq());
    emitService.emitMessageToUser(userSinks, messageDto.getUserSeq().getUserSeq(),
        messageDto.getProgress());
  }

//  @KafkaListener(topics = "${kafka.topic}", groupId = "${kafka.group-id}")
//  public void consume(ConsumerRecord<String, String> record) {
//    logger.debug("record key : {}, record value : {}", record.key(), record.value());
//    String userSeq = record.key();
//    String message  = record.value();
//
//    logger.info("{}에게 {}전송", userSeq, message);
//    emitService.emitMessageToUser(userSinks, userSeq, message);
//  }

  @GetMapping("/health")
  public String healthCheck() {
    return "ok";
  }

}
